const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require('http');

const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, "../public/");
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log("New user connected!");

	socket.on('join', (params, callback) => {
		if (!isRealString(params.username) || !isRealString(params.chatroom)) {
			return callback('Name and room name are required!');
		}

		socket.join(params.chatroom);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.username, params.chatroom);
		io.to(params.chatroom).emit('updateUserList', users.getUserList(params.chatroom));

		// socket.leave(params.chatroom);

		// io.to(params.chatroom).emit();
		// socket.broadcast.to(params.chatroom).emit();

		socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat"
		));
		socket.broadcast.to(params.chatroom).emit('newMessage', generateMessage("Admin",  `User ${params.username} has joined the ${params.chatroom}`));
		callback();
	});

	socket.on('createMessage', (message, callback) => {
		console.log('Message: ', message, new Date().toLocaleTimeString());
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude));
	});

	socket.on("disconnect", () => {
		var user = users.removeUser(socket.id);

		if(user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage("Admin", user.name + " has left the room"));
		}

		
	});
});

// I don't know why this is not needed
// app.get("/", (req, res) => {
// 	res.send("index");
// });

server.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});