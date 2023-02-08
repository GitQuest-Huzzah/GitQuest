const addAllOrgReposToDB = require("./addAllOrgReposToDB");
const findAllReposInDB = require("./findAllReposInDB");
const findOrgOnGH = require("./findOrgOnGH");
const getAllOrgRepos = require("./getAllOrgRepos");
const gitHubDeleteRepo = require('./gitHubDeleteRepo')
const gitHubOrgAllUsers = require("./gitHubOrgAllUsers");
const gitHubSetRepoHook = require("./gitHubSetRepoHook");
const retrieveGitHubAPIToken = require('./retrieveGitHubAPIToken')
const updateUserGitHub = require('./updateUserGitHub')

module.exports = {
	addAllOrgReposToDB,
	findAllReposInDB,
	findOrgOnGH,
	getAllOrgRepos,
	gitHubDeleteRepo,
	gitHubOrgAllUsers,
	gitHubSetRepoHook,
	retrieveGitHubAPIToken,
	updateUserGitHub,
};
