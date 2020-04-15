/*
 * @Author: xuxueliang
 * @Date: 2020-04-15 11:29:21
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-04-15 15:22:21
 */
module.exports.getResult = function (code = 200, userMsg = '', ...data) {
  if (typeof code !== 'number') {
    data.unshift(code)
    code = 200
  }
  if (typeof userMsg !== 'string') {
    data.unshift(userMsg)
    userMsg = 200
  }
  data.unshift({})
  return {
    error: { errno: code, usermsg: userMsg },
    ...Object.assign.apply(null, data.map(v => {
      if (typeof v === 'object') {
        return v
      }
      return { [v]: v }
    }))
  }
}
const os = require('os');
///////////////////获取本机ip///////////////////////
module.exports.getIP = function getIPAdress () {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}