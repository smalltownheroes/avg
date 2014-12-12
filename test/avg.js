global.assert = require("chai").assert;
global.expect = require("chai").expect;

//normal rounding would result in a rounded sum of 99
var fieldValues = { 0: 23094, 1: 38746, 2: 52367, 3: 9889, 4: 83745, 5: 973645 }

describe('Averages', function(){
  describe('rounding', function(){
  	var Averages = require('../lib/avg');
  	var averages = new Averages(fieldValues);
  	roundedAverages = averages.calculate();
  	sum = 0;
  	for(field in roundedAverages){
  		sum += roundedAverages[field];
  	}
    it('should do rounding so that the rounded sum of all parts is 100%', function(){
    	expect(sum).to.equal(100)
    })
  })
  describe('0 field values', function(){
    var Averages = require('../lib/avg');
    var averages = new Averages({"a": 0, "b": 0, "c": 0});
    roundedAverages = averages.calculate();
    expect(roundedAverages).to.have.property('a').that.eql(0);
    expect(roundedAverages).to.have.property('b').that.eql(0)
    expect(roundedAverages).to.have.property('c').that.eql(0)
  })
})