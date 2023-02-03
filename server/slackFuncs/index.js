const adminGitConnectUserModal = require("./adminGitConnectUserModal");
const adminOrgModal = require("./adminOrgModal");
const adminRepoModal = require("./adminRepoModal");
const blockTest = require("./blockTest");
const createOrUpdateOrg = require("./createOrUpdateOrg");
const findAllWorkSpaceRepos = require("./findAllWorkSpaceRepos");
const findTokenByTeamId = require("./findTokenByTeam");
const gitWorkFlow = require("./gitWorkFlow");
const homeTab = require("./homeTab");
const slackInstallAuth = require("./slackInstallAuth");

module.exports = {
	adminGitConnectUserModal,
	adminOrgModal,
	adminRepoModal,
	blockTest,
	createOrUpdateOrg,
	findAllWorkSpaceRepos,
	findTokenByTeamId,
	gitWorkFlow,
	homeTab,
	slackInstallAuth,
};
