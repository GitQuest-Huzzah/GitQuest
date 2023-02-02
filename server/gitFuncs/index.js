const addAllOrgReposToDB = require("./addAllOrgReposToDB");
const findOrgOnGH = require("./findOrgOnGH");
const getAllOrgRepos = require("./getAllOrgRepos");
const gitHubSetRepoHook = require("./gitHubSetRepoHook");
const gitHubUserInfoAPI = require("./gitHubUserInfoAPI");

module.exports = {
	addAllOrgReposToDB,
	findOrgOnGH,
	getAllOrgRepos,
	gitHubUserInfoAPI,
	gitHubSetRepoHook,
};
