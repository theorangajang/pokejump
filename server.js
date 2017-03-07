var express  = require( 'express' ),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 5000,
    bp       = require('body-parser'),
    moment = require('moment'),
    app      = express();


app.use( express.static( path.join( root, 'client' )));
app.use( express.static( path.join( root, 'client/public' )));
app.use( express.static( path.join( root, 'bower_components' )));
app.use( bp.json() );

require('./server/config/db.js');
require('./server/config/routes.js')(app);

var server = app.listen(port, function() {
  console.log('listening on port ${port}');
});
// this is a new line we're adding AFTER our server listener
// take special note how we're passing the server
// variable. unless we have the server variable, this line will not work!!
var io = require('socket.io').listen(server);
var users = {};
var messages = [];

// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {

    socket.on('createChatroom', function (data) {
        console.log('in createChatroom function', data);
        socket.emit('connected', {message: 'you have connected'});
    });

    socket.emit("messages", messages);

    //all the socket code goes in here!
    // If you don't know where this code is supposed to go reread the above info
    socket.on('loggingIn', function (data) {
        console.log(data.user);
        users[socket.id] = data.user;
        socket.broadcast.emit("new_user", {message: data.user + " just logged in!"});
    });

    socket.on("new_message", function (data) {
        console.log(data.message);
        data.created_at = moment().format("MMMM Do YYYY, h:mm:ss a");
        console.log(data.created_at);
        messages.push(data);
        io.emit("messages", messages);
    });

    socket.on('disconnect', function () {
        console.log("Someone logged out");
        var message = {
            name: users[socket.id] + " just left the room!"
        };
        socket.broadcast.emit('loggedOut', message);
        delete users[socket.id];
    });
});



