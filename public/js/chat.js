var socket = io();

function scrollToBottom () {
	var messages = jQuery('#messages');
	var newMessage = messages.children('li:last-child');

	var clientHeight = messages.prop('clientHeight');
	var scrollHeight = messages.prop('scrollHeight');
	var scrollTop = messages.prop('scrollTop');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	};
};

socket.on('connect', function () {
	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function (err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log("No error");
		}
	});
});

socket.on('disconnect', function () {
	var params = jQuery.deparam(window.location.search);

	socket.emit('disconnect', params);
});

socket.on('updateUserList', function(users) {
	console.log('Users list' , users);

	var ol = jQuery('<ol></ol>');
	users.forEach((user) => {
		ol.append(jQuery('<li></li>').text(user));
	});

	jQuery('#users').html(ol);
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
	scrollToBottom();
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
	scrollToBottom();
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


