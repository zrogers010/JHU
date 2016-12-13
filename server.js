var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server is running...')

app.get('', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

//app.use(express.static('public'));
//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + "/public"));

io.sockets.on('connection', function(socket) {
	connections.push(socket);
	console.log('Connected: %s sockets are connected', connections.length);

	// Disconnect
	socket.on('disconnect', function(data) {
		//if(!socket.username) return;
		io.sockets.emit('user_leaves', { user: socket.username });
		users.splice(users.indexOf(socket.username), 1);
		updateUsernames();
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets are connected', connections.length);
	});

	// Send a message
	socket.on('send_message', function(data) {
		io.sockets.emit('new_message', { msg: data, user: socket.username });
	});

	// New users
	socket.on('new_user', function(data, callback) {
		callback(true);
		//socket.username = data;
		socket.username = data[0].username;
		socket.character = data[0].character;
		users.push(socket.username);
		updateUsernames();
		io.sockets.emit('user_joins', { user: socket.username, character: socket.character });
	});

	function updateUsernames() {
		io.sockets.emit('get_users', users);
	}

	// Make move
	socket.on('send_move', function(data) {
		io.sockets.emit('new_move', { move: data, user: socket.username, character: socket.character });
	});

	// Make accusation
	socket.on('send_accusation', function(data) {
		console.log(data);
		io.sockets.emit('new_accusation', { accusation: data, user: socket.username, character: socket.character  });
	});

});