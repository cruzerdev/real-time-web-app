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
  var formatedTime=moment(message.createdAt).format('h:mm a');
  var template=jQuery('#message-template').html();
  var html= Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formatedTime
  });

  jQuery('#messages').append(html);
  // var formatedTime=moment(message.createdAt).format('h:mm a');
  // console.log('New Email send to server.',message);
  // var li=jQuery('<li></li>');
  // li.text(`${message.from} ${formatedTime}:${message.text}`);
  //
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();


  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){
jQuery('[name=message]').val('')
  });
});
socket.on('newLocationMessage',function(message){
   var formatedTime=moment(message.createdAt).format('h:mm a');
  // var li=jQuery('<li></li>');
  // var a =jQuery('<a target="_blank">My Current Location</a>');
  //
  // li.text(`${message.from}: ${formatedTime}`);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
  var template=jQuery('#location-message-template').html();
  var html= Mustache.render(template,{
    from:message.from,
    url:message.url,
    createdAt:formatedTime
  });

  jQuery('#messages').append(html);
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Sending location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Sending location');
    alert('Unable to fetch location.');
  });
});
