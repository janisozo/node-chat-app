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

	socket.emit('newMessage', {
		from: "LaimaPuff",
		text: "Hey. Who wants to meet up at zix? :3",
		createdAt: new Date().toLocaleTimeString()
	});

	socket.on('createMessage', (message) => {
		console.log('Message: ', message, new Date().toLocaleTimeString());
	});

	// socket.emit('newEmail', {
	// 	from: "toto@inbox.lv",
	// 	text: "I got a bad ass new bike!",
	// 	receivedAt: "1236534"
	// });

	// socket.on("createEmail", (newEmail) => {
	// 	console.log("New email created:", newEmail);
	// });

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