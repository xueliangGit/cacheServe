# cacheServe

这是一个 node 端的缓存服务，通过 cacheServeClient 来链接该服务

用来提供一些简单的数据共享服务；内部以对象组成，运行在内存中，保证高速，通过`socket.io`与客户端进行数据通讯；

一旦重启后数据将丢失
