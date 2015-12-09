var express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app),
    socket = require('./server/routes/socket'),
    port = 3000;

app.configure(function(){
  app.use(express.static(__dirname + '/client'));
  app.set('views', __dirname + '/server/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
});

// initialize routes
require('./server/routes')(app);

io.sockets.on('connection', socket);

app.listen(port);                   // let the games begin!
console.log("Web server listening on port " + port);

