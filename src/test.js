/*
 * @Author: xuxueliang
 * @Date: 2020-04-17 18:22:09
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-04-17 18:23:58
 */

console.log('parent pid: ' + process.pid);
var fork = require('child_process').fork;
var child = fork('./_test.js');
console.log('fork return pid: ' + child.pid);