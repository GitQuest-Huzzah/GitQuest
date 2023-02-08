const addQuest = require("./addQuest");
const createAdminGHLink = require('./createAdminGHLink')
const createOrUpdateOrg = require("./createOrUpdateOrg");
const findAllAvailableQuests = require("./findAllAvailableQuests");
const findAllWorkSpaceRepos = require("./findAllWorkSpaceRepos");
const findTokenByTeamId = require("./findTokenByTeamId");
const giveGold = require("./giveGold");
const viewQuests = require("./viewQuests");
module.exports = {
	addQuest,
	createAdminGHLink,
	createOrUpdateOrg,
	findAllAvailableQuests,
	findAllWorkSpaceRepos,
	findTokenByTeamId,
	giveGold,
	viewQuests,
};
