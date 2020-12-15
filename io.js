const { isObject } = require('lodash');

const app = require('express')();

let httpServer = require('http').createServer(app);

let io = require('socket.io')(httpServer, {cors: ['http://127.0.0.1:8000']});

// 服务端监听连接状态：io的connection事件表示客户端与服务端成功建立连接，它接收一个回调函数，回调函数会接收一个socket参数。
io.on('connection',  (socket)=>{
  console.log('client connect server, ok!');
  socket.join(socket.id);
  io.to(socket.id).emit('server message', socket.id);

  // io.emit()方法用于向服务端发送消息，发送所有命名空间"/"下的client, 参数1表示自定义的数据名，参数2表示需要配合事件传入的参数
  io.emit('server message', {msg:'client connect server success'});

  // socket.broadcast.emit()表示向除了自己以外的客户端发送消息
  socket.broadcast.emit('server message', {msg:'broadcast'});

  // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
  socket.on('disconnect', ()=>{
    console.log('connect disconnect');
  });
  
  // 与客户端对应的接收指定的消息
  socket.on('client message', (data, data2)=>{
    console.log(data, data2);
  });

  // socket.disconnect();
});

httpServer.listen(8000, () => {
    // console.log('ready');
});

app.get('/test', (req, res) => {
  io.emit('test', 'I am testing');
});