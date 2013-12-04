var _ = require('underscore')._

var Averages = function(fieldValues){
	this.roundedTotal = 0;
	this.fieldValues = fieldValues;
	this.averages = {};
};

Averages.prototype.calculate = function(){
	var total = _.reduce(fieldValues, function(memo, num){
		return parseInt(memo, 10) + parseInt(num, 10);
	}, 0);
	if(total === 0){
		for(field in this.averages){
			this.averages[field] = 0;
		}
	}
	else{
		for(field in fieldValues){
			var value = fieldValues[field];
			this.averages[field] = (parseInt(value, 10) / total) * 100;
			this.roundedTotal += Math.round(this.averages[field]);
		}
		this.round();
	}
	return this.averages;
};

Averages.prototype.round = function(){
	if(this.roundedTotal !== 100){
		var _this = this;
		var correction = 100 - this.roundedTotal;
		var sortedByDecimals = _.sortBy(_.keys(this.averages), function(field){
			return (1/(_this.averages[field]%1 - 0.5))*(correction/Math.abs(correction));
		});
		for(var i = 0; i < Math.abs(correction); i++){
			this.averages[sortedByDecimals[i]] += 0.5 * correction / Math.abs(correction);
		}
	}
	for(field in this.averages){
		this.averages[field] = Math.round(this.averages[field]);
	}
};

module.exports = Averages;