var socket = io();

socket.on('connect', function () {
	console.log('Connected to server!');

});

socket.on('disconnect', function () {
	console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	// console.log('message:', message);
	// var li = jQuery('<li></li>');
	// li.text(`${formattedTime} : ${message.from}: ${message.text}`);

	// jQuery('#messages').append(li);

	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
});

socket.on('newLocationMessage', (locationMessage) => {
	var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
	// var li = jQuery('<li></li>');
	// var a = jQuery('<a target = "_blank">My current location</a>');
	// li.text(`${formattedTime} : ${locationMessage.from}:`);
	// a.attr('href', `${locationMessage.url}`);

	// li.append(a);
	// jQuery('#messages').append(li);

	var template = jQuery('#locationMessage-template').html();
	var html = Mustache.render(template, {
		text: locationMessage.url,
		from: locationMessage.from,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	var messageTextBox = jQuery('[name=message');

	socket.emit('createMessage', {
		from: "User",
		text: messageTextBox.val()
	}, function () {
		messageTextBox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if (!navigator.geolocation) {
 		return alert('Geolocation not supported by your broswer.');
 	}

 	locationButton.attr('disabled', 'disabled').text('Fetching position');

	 navigator.geolocation.getCurrentPosition((position) => {
		 locationButton.removeAttr('disabled').text("Send location");
		 socket.emit('createLocationMessage', {
		 	latitude: position.coords.latitude,
		 	longitude: position.coords.longitude
		 });
	 }, () => {
	 	locationButton.removeAttr('disabled').text("Send location");
	 	alert('Unable to fetch location');
	 });
});


