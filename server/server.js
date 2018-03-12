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
  socket.on('disconnect',()=>{
    console.log('New User Disconnected.');
  });
});

server.listen(port,()=>{
  console.log(`Server started at port ${port}.`);
});
