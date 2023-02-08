const addPRIDToQuest = require("./addPRIDToQuest");
const commitAchievements = require("./commitAchievements");
const commitReqAchieveFunc = require("./commitReqAchieveFunc");
const expLevel = require("./expLevel");
const pullReqAchieveFunc = require("./pullReqAchieveFunc");
const pullRequestAchievements = require("./pullRequestAchievements");
const titles = require("./titles");
const updateQuestsOnPR = require("./updateQuestsOnPR");
const updateUserOnPR = require("./updateUserOnPR");
const userLevelFunc = require("./userLevelFunc");
const userTitleFunc = require("./userTitleFunc");

module.exports = {
	addPRIDToQuest,
	commitAchievements,
	commitReqAchieveFunc,
	expLevel,
	pullReqAchieveFunc,
	pullRequestAchievements,
	titles,
	updateQuestsOnPR,
	updateUserOnPR,
	userLevelFunc,
	userTitleFunc,
};
