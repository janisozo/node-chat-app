var socket = io();

socket.on('connect', function () {
	console.log('Connected to server!');

	// socket.emit("createEmail", {
	// 	to: "Wife@gmail.com",
	// 	text: "I love my wife",
	// 	timestamp: 123568
	// });

	socket.emit('createMessage', {
		from: "OzyBro",
		text: 'Only if we meet at your place ;)'
	});
});



socket.on('disconnect', function () {
	console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
	console.log('message:', message)
});

// socket.on("newEmail", function (email) {
// 	console.log("New email received", email);
// });