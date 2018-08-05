const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate a message with a from and text propery', () => {
		var from = "Tester";
		var testText = "This works";
		var testedMessage = generateMessage(from, testText);

		expect(typeof testedMessage.createdAt).toBe("number");
		expect(testedMessage).toMatchObject({from, text: testText});
	});
});