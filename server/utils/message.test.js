const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate a message with a from and text propery', () => {
		var from = "Tester";
		var testText = "This works";
		var testedMessage = generateMessage(from, testText);

		expect(typeof testedMessage.createdAt).toBe("number");
		expect(testedMessage).toMatchObject({from, text: testText});
	});
});

describe('generateLocationMessage', () => {
	it('should generate a valid address when called', (done) => {
		var from = "Tester";
		var latitude = "32.37978";
		var longitude = "-105.23802";
		var testedLocationMessage = generateLocationMessage(from, latitude, longitude);

		expect(typeof testedLocationMessage.createdAt).toBe("number");
		expect(testedLocationMessage.url).toBe(`https://www.google.com/maps?q=32.37978,-105.23802`);
		done();
	});
});