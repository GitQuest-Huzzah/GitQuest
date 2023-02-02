const addAllOrgReposToDB = require("./addAllOrgReposToDB");
const findOrgOnGH = require("./findOrgOnGH");
const getAllOrgRepos = require("./getAllOrgRepos");
const gitHubSetRepoHook = require("./gitHubSetRepoHook");
const gitHubOrgAllUsers = require("./gitHubOrgAllUsers");
const retrieveGitHubAPIToken = require('./retrieveGitHubAPIToken')
const updateUserGitHub = require('./updateUserGitHub')
module.exports = {
	addAllOrgReposToDB,
	findOrgOnGH,
	getAllOrgRepos,
	gitHubOrgAllUsers,
	gitHubSetRepoHook,
	retrieveGitHubAPIToken,
	updateUserGitHub
};
