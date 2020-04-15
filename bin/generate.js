/*
 * @Author: xuxueliang
 * @Date: 2020-04-15 13:58:34
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-04-15 14:32:25
 */

const program = require('commander')

const { CacheServeStart } = require('../src/index')
// release online
// const childProcess = require('child_process')
// 载入用户配置
/**
 * Usage.
 */
program
  .command('start [port]')
  .description('开启服务')
  .action(function (port, ...other) {
    CacheServeStart(port)
  })
program.parse(process.argv)