/*
 * @Author: xuxueliang
 * @Date: 2020-04-14 11:38:42
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-04-15 17:41:07
 */
const server = require('http').createServer();
const cache = require('./cache')
const { getIP } = require('./util')
module.exports.CacheServeStart = function CacheServeStart (port = 10080) {
  server.listen(port);
  console.log('缓存数据服务已开启: http://' + getIP() + ':' + port)
  const io = require('socket.io')(server, {
    path: '/',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });
  io.sockets.on('connection', function (socket) {
    try {
      console.log('客户端ip:', socket.client.conn.remoteAddress)
      socket.on('getTable', function ({ mid }) {
        socket.emit('message from serve', { mid, data: cache.getTable() })
      });
      socket.on('set', async function ({ mid, table, data, params }) {
        let datas = await cache.setData({ table, data, params })
        socket.emit('message from serve', { mid, data: datas })
      });
      socket.on('get', function ({ mid, table, key }) {
        socket.emit('message from serve', { mid, data: cache.getData({ table, key }) })
      });
      socket.on('disconnect', function (err) {
        console.log(err)
      });
    } catch (e) {
      console.log('----error-----', e)
    }

  })
}
module.exports.CacheServeStop = function () {
  server.close()
}