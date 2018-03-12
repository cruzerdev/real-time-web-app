var socket=io();  //used for open a new connection between client and server
socket.on('connect',function (){
console.log('Connected to Server,');
// socket.emit('createEmail',{
//   to:"salman@gmail.com",
//   text:"Hello, Mr Dev."
// });
// socket.emit('createMessage',{
//   from:"dev@gmail.com",
//   text:"Hello Mr. Dev"
// });
});
socket.on('disconnect',function (){
console.log('Disconnected from Server.');
});
// socket.on('newEmail',function (email){
//   console.log('New Email send to server.',email);
// });
// socket.emit('createMessage',{
//   from:"dev@gmail.com",
//   text:"Hello Mr. Dev"
// },function(data){
//   console.log('Done.',data);
// });
socket.on('newMessage',function (message){
  console.log('New Email send to server.',message);
  var li=jQuery('<li></li>');
  li.text(`${message.from}:${message.text}`);

  jQuery('#message').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){

  });
});
