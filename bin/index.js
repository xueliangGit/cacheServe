#!/usr/bin/env node

/*
 * @Author: xuxueliang
 * @Date: 2020-04-15 13:58:01
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-04-15 14:07:56
 */
process.title = 'cacheServe'
require('commander')
  .version(require('../package').version, '-v, --version')
  .usage('<command> [options]')
  // .command('url',' Use of links')
  // .command('config','Use configuration files')
  .parse(process.argv)

require('./generate')