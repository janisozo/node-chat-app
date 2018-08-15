const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: "doomslayer",
			room: "gorenest"
		}, {
			id: '2',
			name: "drHayden",
			room: "Phobos"
		}, {
			id: '3',
			name: "doomguy",
			room: "gorenest"
		}];
	});

	it('Should add a user', () => {
		var users = new Users();
		var addedUser = users.addUser(11, 'Blow', "Brains");

		expect(addedUser.id).toBe(11);
		expect(users.users[0].id).toBe(11);
		expect(users.users).toEqual([addedUser]);
	});

	it('Should return an array of users in a room', () => {
		var userArray = users.getUserList ('gorenest');
		expect(userArray).toEqual(['doomslayer', 'doomguy']);
	});

	it('Should not return an array of users in an invalid room', () => {
		var userArray = users.getUserList ('gorenestFake');
		expect(userArray).toMatchObject([]);
	});

	it('Should return a user by id', () => {
		var returnedUser = users.getUser('1');
		expect(returnedUser).toMatchObject({name: "doomslayer", id: '1', room: "gorenest"});
	});

	it('Should not return an invalid user by id', () => {
		var returnedUser = users.getUser('5');
		expect(returnedUser).toBe(undefined);
	});

	it('Should delete a user by id', () => {
		var returnedUser = users.removeUser('3');
		expect(returnedUser).toMatchObject({name: "doomguy", id: '3', room: "gorenest"});
		expect(users.users.length).toBe(2);
	});

	it('Should not delete an ivalid user by id', () => {
		var returnedUser = users.removeUser('333');
		expect(returnedUser).toBeFalsy();
		expect(users.users.length).toBe(3);
	});

	it('Should splice a user by id', () => {
		var returnedUser = users.removeUserBySplice('3');
		expect(returnedUser).toMatchObject({name: "doomguy", id: '3', room: "gorenest"});
		expect(users.users.length).toBe(2);
	});

	// it('Should return an array of users in a room 2', () => {
	// 	var userArray = users.getUserList ('Phobos');
	// 	expect(userArray).toEqual(['drHayden']);
	// });
});