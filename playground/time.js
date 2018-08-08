var moment = require('moment');

// var date = new Date();
// console.log(date.getMinutes());

var date = moment();
date.subtract(1, 'hour');
// date.subtract(10, 'years').add(5, 'years');
// console.log(date.format('MMM Do YYYY HH:mm:ss a'));
console.log(date.format('h:mm a'));

var createdAt = 1234;
var date2 = moment(createdAt);
console.log(date2.format('h:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);