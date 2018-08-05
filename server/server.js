const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require('http');

const publicPath = path.join(__dirname, "../public/");
const port = process.env.PORT || 3000;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log("New user connected!");

	socket.on('createMessage', (message) => {
		console.log('Message: ', message, new Date().toLocaleTimeString());
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().toLocaleTimeString()
		});
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