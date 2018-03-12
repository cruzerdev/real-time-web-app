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

socket.emit('newMessage',{
  from:'deva@gmail.com',
  text:"Voila!, Devanshu You got the concept.",
  createdAt:new Date()
});

// socket.on('createEmail',(newEmail)=>{
//   console.log('createEmail',newEmail);
// });
socket.on('createMessage',(message)=>{
  console.log('createMessage',message);
});
  socket.on('disconnect',()=>{
    console.log('New User Disconnected.');
  });
});

server.listen(port,()=>{
  console.log(`Server started at port ${port}.`);
});
