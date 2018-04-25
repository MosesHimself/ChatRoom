//this creates an express application object
//https://expressjs.com/en/4x/api.html#app
var express = require('express');
var app = express();

var http = require('http').Server(app);
//socket io instance is created by
//passing the http server instance
var io = require('socket.io')(http);

var clients = 0;
var clientNames = {};

//route definition. "GET / HTTP/1.1" as a requestLine
//relative to the root directory
app.get('/', function(req, res){
  //use req object to determine shizz from the request
  res.sendFile(__dirname + '/index.html');
});

//listening for connection to the http server
io.on('connection', function(socket){
  clients++;
  console.log('a user connected');

  socket.on('login', function (data) {
    console.log(data.user + " is trying to connect!");
    socket.emit('confirmation',{val: "true"});
  });

  socket.emit('newclientconnect',{ description: 'Hey, welcome!'});

  socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})

  socket.on('disconnect', function () {
    clients--;
    console.log('a user disconnected');
    socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
  });

  //receiveing a chat event
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    //emit will send to all clients
    io.emit('chat message', msg);
  });
});

//this starts up the server and directs it where to listen
http.listen(3000, function(){
  console.log('listening on *:3000');
});
