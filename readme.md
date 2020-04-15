# cacheServe

这是一个 node 端的缓存服务，通过 cacheServeClient 来链接该服务

用来提供一些简单的数据共享服务；内部以对象组成，运行在内存中，保证高速，通过`socket.io`与客户端进行数据通讯；

一旦重启后数据将丢失

搭配 [cacheServeClient](https://www.npmjs.com/package/cache-serve-client)

## 使用

> 全局安装方式

```js
npm i cache-serve -g

cacheServe start  // 开启10080端口 服务
```

> 局部使用

```js
// 安装
npm i cache-serve -g

//在 package.json 修改文件
"scripts": {
    "start:cache":"cacheServe start ",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
// 开始
npm run start:cache
```

## 缓存的时效

缓存时间默认是 缓存一个小时；一小时后会自动销毁

可以通过 cacheServeClient 工具进行操作时添加过期时间

```js
// lifetime 是 存活时间 table 要存在那个分类里 data 要存储的数据 Object
cacheServe
  .set({ table: 'cart1', data, params: { lifetime: 3000 } })
  .then((res) => {
    if (i <= 1) {
      times.setE = Date.now() - times.setB
      console.log('数据执行完毕,耗时：', times.setE, 'ms')
    } else {
      console.log(data, i, 'set')
      // setData(--i)
    }
  })
```
