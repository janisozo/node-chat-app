var socket = io();

socket.on('connect', function () {
	console.log('Connected to server!');

});

socket.on('disconnect', function () {
	console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
	console.log('message:', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: "User",
		text: jQuery('[name=message]').val()
	}, function () {
		
	});

	var locationButton = jQuery('#send-location');
	locationButton.on('click', function () {
		if (!navigator.geolocation) {
			return alert('Geolocation not supported by your broswer.');
		}

		navigator.geolocation.watchPosition(function(position) {
			console.log(position);
		}, function () {
			alert("Unable to fetch position");
		});
	});
});