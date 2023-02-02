const addAllOrgReposToDB = require("./addAllOrgReposToDB");
const findOrgOnGH = require("./findOrgOnGH");
const getAllOrgRepos = require("./getAllOrgRepos");
const gitHubSetRepoHook = require("./gitHubSetRepoHook");
const gitHubOrgAllUsers = require("./gitHubOrgAllUsers");
const retrieveGitHubAPIToken = require('./retrieveGitHubAPIToken')
module.exports = {
	addAllOrgReposToDB,
	findOrgOnGH,
	getAllOrgRepos,
	gitHubOrgAllUsers,
	gitHubSetRepoHook,
	retrieveGitHubAPIToken
};
