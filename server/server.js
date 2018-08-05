const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require('http');

const publicPath = path.join(__dirname, "../public/");
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log("New user connected!");

	socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat"
		));

	socket.broadcast.emit('newMessage', generateMessage("Admin", "A new user has joined"));

	socket.on('createMessage', (message, callback) => {
		console.log('Message: ', message, new Date().toLocaleTimeString());
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback("This is from the server");

		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().toLocaleTimeString()
		// });
	});

	socket.on("disconnect", () => {
		console.log("A client disconnected");
	});
});

// I don't know why this is not needed
// app.get("/", (req, res) => {
// 	res.send("index");
// });

server.listen(port, () => {
	console.log(`Server running on port ${port}.`);
});