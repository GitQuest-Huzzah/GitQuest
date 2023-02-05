const achievementsModal = require('./achievementsModal')
const adminGitConnectUserModal = require("./adminGitConnectUserModal");
const adminOrgModal = require("./adminOrgModal");
const adminRepoModal = require("./adminRepoModal");
const blockTest = require("./blockTest");
const createOrUpdateOrg = require("./createOrUpdateOrg");
const findAllWorkSpaceRepos = require("./findAllWorkSpaceRepos");
const findTokenByTeamId = require("./findTokenByTeam");
const gitWorkFlow = require("./gitWorkFlow");
const giveGold = require('./giveGold')
const giveGoldModal = require("./giveGoldModal")
const goldLogModal = require('./goldLogModal')
const homeTab = require("./homeTab");
const slackInstallAuth = require("./slackInstallAuth");

module.exports = {
    achievementsModal,
	adminGitConnectUserModal,
	adminOrgModal,
	adminRepoModal,
	blockTest,
	createOrUpdateOrg,
	findAllWorkSpaceRepos,
	findTokenByTeamId,
    giveGoldModal,
	gitWorkFlow,
    giveGold,
    goldLogModal,
	homeTab,
	slackInstallAuth,
};
