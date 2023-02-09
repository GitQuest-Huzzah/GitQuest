const addAllOrgReposToDB = require("./gitFuncs/addAllOrgReposToDB");
const addNewQuest = require("./slackFuncs/addNewQuest");
const addPRIDToQuest = require("./webhookFuncs/addPRIDToQuest");
const adminAssignQuestComplete = require("./slackFuncs/adminAssignQuestComplete");
const commitAchievements = require("./webhookFuncs/commitAchievements");
const commitReqAchieveFunc = require("./webhookFuncs/commitReqAchieveFunc");
const createAdminGHLink = require("./slackFuncs/createAdminGHLink");
const createOrUpdateOrg = require("./slackFuncs/createOrUpdateOrg");
const expLevel = require("./webhookFuncs/expLevel");
const findAllActiveQuestsPerUser = require("./queryFuncs/findAllActiveQuestPerUser");
const findAllActiveQuests = require("./queryFuncs/findAllActiveQuests");
const findAllAvailableQuests = require("./queryFuncs/findAllAvailableQuests");
const findAllOrgRepos = require("./queryFuncs/findAllOrgRepos");
const findAllReposInDB = require("./queryFuncs/findAllReposInDB");
const findAllWorkSpaceRepos = require("./queryFuncs/findAllWorkSpaceRepos");
const findGitHubAPIToken = require("./queryFuncs/findGitHubAPIToken");
const findGitHubOrgAllUsers = require("./queryFuncs/findGitHubOrgAllUsers");
const findOrgOnGH = require("./queryFuncs/findOrgOnGH");
const findTokenByTeamId = require("./queryFuncs/findTokenByTeamId");
const gitHubDeleteRepo = require("./gitFuncs/gitHubDeleteRepo");
const gitHubInstall = require("./gitFuncs/gitHubInstall");
const gitHubSetRepoHook = require("./gitFuncs/gitHubSetRepoHook");
const giveGold = require("./slackFuncs/giveGold");
const pullReqAchieveFunc = require("./webhookFuncs/pullReqAchieveFunc");
const pullRequestAchievements = require("./webhookFuncs/pullRequestAchievements");
const questDisplay = require("./slackFuncs/questDisplay");
const questLog = require("./slackFuncs/questLog");
const slackInstallAuth = require("./slackFuncs/slackInstallAuth");
const titles = require("./webhookFuncs/titles");
const updateQuestsOnPR = require("./webhookFuncs/updateQuestsOnPR");
const updateUserGitHub = require("./gitFuncs/updateUserGitHub");
const updateUserOnPR = require("./webhookFuncs/updateUserOnPR");
const userLevelFunc = require("./webhookFuncs/userLevelFunc");
const userTitleFunc = require("./webhookFuncs/userTitleFunc");
const viewQuests = require("./slackFuncs/viewQuests");

module.exports = {
	addAllOrgReposToDB,
	addNewQuest,
	addPRIDToQuest,
	adminAssignQuestComplete,
	commitAchievements,
	commitReqAchieveFunc,
	createAdminGHLink,
	createOrUpdateOrg,
	expLevel,
	findAllActiveQuestsPerUser,
	findAllActiveQuests,
	findAllAvailableQuests,
	findAllOrgRepos,
	findAllReposInDB,
	findAllWorkSpaceRepos,
	findGitHubAPIToken,
	findGitHubOrgAllUsers,
	findOrgOnGH,
	findTokenByTeamId,
	gitHubDeleteRepo,
	gitHubInstall,
	gitHubSetRepoHook,
	giveGold,
	pullReqAchieveFunc,
	pullRequestAchievements,
	questDisplay,
	questLog,
	slackInstallAuth,
	titles,
	updateQuestsOnPR,
	updateUserGitHub,
	updateUserOnPR,
	userLevelFunc,
	userTitleFunc,
	viewQuests,
};
