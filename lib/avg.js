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
		return this.round(averages, roundedTotal);
	}

	round(averages, roundedTotal) {
		const roundedAverages = {};
		const correction = 100 - roundedTotal;

		if (correction === 0 || correction === 100) {
			for (let key in averages) {
				roundedAverages[key] = Math.round(averages[key]);
			}
			return roundedAverages;
		}

		const sortedByDecimals = Object.keys(averages).sort(key => {
			return (1/(averages[key]%1 - 0.5))*(correction/Math.abs(correction));
		});
		for(let i = 0; i < Object.keys(averages).length; i++){
			if (i < Math.abs(correction)) {
				roundedAverages[sortedByDecimals[i]] = Math.round(averages[sortedByDecimals[i]] += 0.5 * correction / Math.abs(correction));
			} else {
				roundedAverages[sortedByDecimals[i]] = Math.round(averages[sortedByDecimals[i]]);
			}
		}
		return roundedAverages;
	}

}

module.exports = Averages;