class Users {
	constructor () {
		this.users = [];
	}
	addUser (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	removeUser (id) {
		// return user that was removed
		var userToDelete = this.getUser(id);

		if(userToDelete) {
			this.users = this.users.filter((user) => {
			return user.id !== id;
		});
		}
		return userToDelete;
	}
	removeUserBySplice (id) {
		var userToDelete = this.getUser(id);

		this.users.splice(this.users.indexOf({id: 'id',
			name: "doomguy",
			room: "gorenest"}), 1);
		return userToDelete;
	}
	getUser (id) {
		var fetchedUser = this.users.filter((user) => {
			return user.id === id;
		});

		return fetchedUser[0];
	}
	getUserList (room) {
		var users = this.users.filter((user) => {
			return user.room === room;
		});
		var namesArray = users.map((user) => {
			return user.name;
		});

		return namesArray;
	}
}

module.exports = {Users};

// class Person {
// 	constructor (name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription () {
// 		return `${this.name} is ${this.age} years old`;
// 	}
// }

// var me = new Person ("John", 22);
// console.log(me.name);
// var description = me.getUserDescription();
// console.log(description);