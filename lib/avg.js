class Averages {

	constructor(config) {
		this.config = config || {};
	}

	calculate(object) {
		const total = Object.keys(object).reduce((sum, key) => sum + object[key], 0);
		const averages = {};
		let roundedTotal = 0;

		for (let key in object) {
			const value = object[key];
			averages[key] = total === 0 ? 0 : (parseInt(value, 10) / total) * 100;
			roundedTotal += Math.round(averages[key]);
		}
		if (roundedTotal === 0 || roundedTotal === 100) {
			return averages;
		}
		return this.round(averages, roundedTotal);
	}

	round(averages, roundedTotal) {
		const roundedAverages = {};
		const correction = 100 - roundedTotal;
		const sortedByDecimals = Object.keys(averages).sort(key => {
			return (1/(averages[key]%1 - 0.5))*(correction/Math.abs(correction));
		});
		for(let i = 0; i < Math.abs(correction); i++){
			roundedAverages[sortedByDecimals[i]] = averages[sortedByDecimals[i]] += 0.5 * correction / Math.abs(correction);
		}
		return roundedAverages;
	}

}

module.exports = Averages;