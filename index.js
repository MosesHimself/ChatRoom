//this creates an express application
//https://expressjs.com/en/4x/api.html#app
var app = require('express')();

var http = require('http').Server(app);
//socket io instance is created by
//passing the http server instance
var io = require('socket.io')(http);

//route definition. "GET / HTTP/1.1" as a requestLine
app.get('/', function(req, res){
  //use req object to determine shizz from the request
  res.sendFile(__dirname + '/index.html');
});

//listening for connection to the http server
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
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
