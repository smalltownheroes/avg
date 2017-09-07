global.assert  = require("chai").assert;
global.expect  = require("chai").expect;
const Averages = require('../lib/avg');

//normal rounding would result in a rounded sum of 99
const fieldValues = { 0: 23094, 1: 38746, 2: 52367, 3: 9889, 4: 83745, 5: 973645 }

describe('Averages', () => {

	it('rounds averages', () => {
		const averages = new Averages();
		const roundedAverages = averages.calculate(fieldValues);
		let sum = 0;
		for(let key in roundedAverages){
			sum += roundedAverages[key];
		}
		expect(sum).to.equal(100);
	});

	it('0 field values', function(){
		const averages = new Averages();
		const roundedAverages = averages.calculate({"a": 0, "b": 0, "c": 0});
		expect(roundedAverages).to.have.property('a').that.eql(0);
		expect(roundedAverages).to.have.property('b').that.eql(0)
		expect(roundedAverages).to.have.property('c').that.eql(0)
	});

	it('simple percentage', function(){
		const averages = new Averages();
		const roundedAverages = averages.calculate({"a": 33, "b": 20, "c": 50});
		expect(roundedAverages).to.eql({ a: 32, b: 19, c: 49 });
	});

});