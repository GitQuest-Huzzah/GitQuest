// identify the most recent achievement based on pull requests
const pullReqAchieveFunc = (obj, keys, numOfPulls) => {
	let achievement;
	for (const key of keys) {
		if (key <= numOfPulls) {
			achievement = { [key]: obj[key] };
		}
	}
	return achievement;
};

module.exports = pullReqAchieveFunc;
