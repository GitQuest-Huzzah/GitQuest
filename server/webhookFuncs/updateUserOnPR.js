const expLevel = require("./expLevel");
const commitAchievements = require("./commitAchievements");
const pullRequestAchievements = require("./pullRequestAchievements");
const titles = require("./titles");
const { Users, Workspaces } = require("../db");

const updateUserOnPR = async (reqBody) => {
	const userGithubId = reqBody.sender.id.toString();
	const userOrgName = reqBody.organization.login;

	const user = await Users.findOne({
		where: {
			gitHubID: userGithubId,
		},
		include: {
			model: Workspaces,
			where: {
				orgName: userOrgName,
			},
		},
	});

	const numOfCommits = reqBody.pull_request.commits + user.dataValues.commits;
	const userExp = numOfCommits * 10;
	const numOfPulls = user.dataValues.pullRequests + 1;

	const currLevel = user.dataValues.level;
	let userGold = user.dataValues.gold;
	let rewardGold = user.dataValues.rewardGold;
	const userAchievements = user.dataValues.achievements;

	const achievementsPR = pullRequestAchievements();
	const achievementsCommit = commitAchievements();
	const levels = expLevel();
	const title = titles();

	// export this func
	const userLevelFunc = (obj, keys, userExp) => {
		let level;
		for (const key of keys) {
			if (key <= userExp) {
				level = obj[key];
			}
		}
		return level;
	};
	//end export

	// update gold and reward gold based on leveling up
	const userLevel = userLevelFunc(levels, Object.keys(levels), userExp);
	if (userLevel > currLevel) {
		let levelDiff = userLevel - currLevel;
		userGold = userGold + 250 * levelDiff;
		rewardGold = rewardGold + 50 * levelDiff;
	}

	// export this one too
	const userTitleFunc = (obj, keys, userLevel) => {
		let title;
		for (const key of keys) {
			if (key <= userLevel) {
				title = obj[key];
			}
		}
		return title;
	};
	// end export

	const userTitle = userTitleFunc(title, Object.keys(title), userLevel);

	// export this guy
	const pullReqAchieveFunc = (obj, keys, numOfPulls) => {
		let achievement;
		for (const key of keys) {
			if (key <= numOfPulls) {
				achievement = { [key]: obj[key] };
			}
		}
		return achievement;
	};
	//end export

	const userPRAchieve = pullReqAchieveFunc(
		achievementsPR,
		Object.keys(achievementsPR),
		numOfPulls
	);

	//export dis shit
	const commitReqAchieveFunc = (obj, keys, numOfCommits) => {
		let achievement;
		for (const key of keys) {
			if (key <= numOfCommits) {
				achievement = { [key]: obj[key] };
			}
		}
		return achievement;
	};
	//end export

	const userCommitAchieve = commitReqAchieveFunc(
		achievementsCommit,
		Object.keys(achievementsCommit),
		numOfCommits
	);

	// check to see if user achievements already exist
	// if so, keep those and add the new achievement
	// otherwise, just add the new achievements
	let parsedUserAchievements = JSON.parse(userAchievements);

	for (const achieve of parsedUserAchievements) {
		if (JSON.stringify(achieve) !== JSON.stringify(userCommitAchieve)) {
			parsedUserAchievements = [...parsedUserAchievements, userCommitAchieve];
			break;
		}
	}

	for (const achieve of parsedUserAchievements) {
		if (JSON.stringify(achieve) !== JSON.stringify(userPRAchieve)) {
			parsedUserAchievements = [...parsedUserAchievements, userPRAchieve];
			break;
		}
	}

	let userAchievementJSON = JSON.stringify(parsedUserAchievements);

	await user.update({
		commits: numOfCommits,
		pullRequests: numOfPulls,
		level: userLevel,
		title: userTitle,
		exp: userExp,
		achievements: userAchievementJSON,
		gold: userGold,
		rewardGold: rewardGold,
	});
};

module.exports = updateUserOnPR;
