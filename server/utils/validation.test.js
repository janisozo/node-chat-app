const expect = require('expect');

var {isRealString} = require('./validation');

describe('String validation', () => {
	it("Should pass if presented a real string", () => {
		var realString = "     Iced out chain    ";

		var testedString = isRealString(realString);

		expect(testedString).toBeTruthy();
	});

	it("Should return false if presented a spaces-only string", () => {
		var fakeString = "    ";

		var testedString = isRealString(fakeString);

		expect(testedString).toBeFalsy();
	});

	it("Should return false if presented a non-string value", () => {
		var nonString = 666;

		var testedString = isRealString(nonString);

		expect(testedString).toBeFalsy();
	});
});