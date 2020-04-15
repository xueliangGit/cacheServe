/*
 * @Author: xuxueliang
 * @Date: 2020-04-14 11:38:42
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-04-15 18:05:33
 */
const server = require('http').createServer();
const cache = require('./cache')
const { getIP } = require('./util')
const fs = require('fs')
const pidPath = __dirname + '/.pid'
const infoPath = __dirname + '/.info'
module.exports.CacheServeStart = function CacheServeStart (port = 10080) {
  if (fs.existsSync(pidPath)) {
    console.log('您已经开启了服务')
    fs.readFile(infoPath, 'utf-8', function (err, data) {
      if (err) {
        return
      }
      console.log(data)
    })
    return
  }
  server.listen(port);
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
  let url = 'http://' + getIP() + ':' + port
  console.log('缓存数据服务已开启: ' + url)
  fs.writeFile(pidPath, process.pid, function () { })
  fs.writeFile(infoPath, url, function () { })
}
module.exports.CacheServeStop = function () {
  fs.readFile(pidPath, 'utf-8', function (err, data) {
    if (err) {
      console.log('没有开启服务')
      return
    }
    try {
      process.kill(data)
      console.log('关闭成功')
    } catch (e) {
      console.log(e)
    }
    fs.unlinkSync(pidPath)
  })
}