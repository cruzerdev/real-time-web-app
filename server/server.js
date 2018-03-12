const path=require('path');
const http=require('http');
const express =require('express');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT || 3000;

// console.log(__dirname+'/../public');
// console.log(publicPath);
var app=express();
//Down below created a Server that require http connection
var server =http.createServer(app);

var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New User Connected');

// socket.emit('newEmail',{
//   from:'dev@gmail.com',
//   text:"Voila!",
//   createdAt:123
// });
//--------------New message emit to clients by server
// socket.emit('newMessage',{
//   from:'deva@gmail.com',
//   text:"Voila!, Devanshu You got the concept.",
//   createdAt:new Date()
// });

// socket.on('createEmail',(newEmail)=>{
//   console.log('createEmail',newEmail);
// });
//Below code will emit a message who first join the chat App
socket.emit('newMessage',{
  from:'Admin',
  text:'Welcome to chat App.',
  createdAt:new Date()
});
//Below code will give notification if any new user joins the chat app
socket.broadcast.emit('newMessage',{
  from:'Admin',
  text:'New User joined',
  createdAt:new Date()
});
socket.on('createMessage',(message)=>{
  console.log('createMessage',message);
  io.emit('newMessage',{
    from:message.from,
    text:message.text,
    createdAt:new Date().getTime()
  });
//------Below commented code will broadcasting the message except the one who broadcast
  // socket.broadcast.emit('newMessage',{
  //   from:message.from,
  //   text:message.text,
  //   createdAt:new Date().getTime()
  // });
});
  socket.on('disconnect',()=>{
    console.log('New User Disconnected.');
  });
});

server.listen(port,()=>{
  console.log(`Server started at port ${port}.`);
});
