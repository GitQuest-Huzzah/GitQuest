const addAllOrgReposToDB = require("./gitFuncs/addAllOrgReposToDB");
const addNewQuest = require("./slackFuncs/addNewQuest");
const addPRIDToQuest = require("./webhookFuncs/addPRIDToQuest");
const adminAssignQuestComplete = require("./slackFuncs/adminAssignQuestComplete");
const commitAchievements = require("../server/webhookFuncs/commitAchievements");
const commitReqAchieveFunc = require("../server/webhookFuncs/commitReqAchieveFunc");
const createAdminGHLink = require("./slackFuncs/createAdminGHLink");
const createOrUpdateOrg = require("./slackFuncs/createOrUpdateOrg");
const expLevel = require("../server/webhookFuncs/expLevel");
const findAllActiveQuestPerUser = require("./queryFuncs/findAllActiveQuestPerUser");
const findAllActiveQuests = require("./queryFuncs/findAllActiveQuests");
const findAllOrgRepos = require("./queryFuncs/findAllOrgRepos");
const findAllReposInDB = require("./queryFuncs/findAllReposInDB");
const findAllWorkSpaceRepos = require("./queryFuncs/findAllWorkSpaceRepos");
const findAvailableQuests = require("./queryFuncs/findAllAvailableQuests");
const findGitHubAPIToken = require("./queryFuncs/findGitHubAPIToken");
const findGitHubOrgAllUsers = require("./queryFuncs/findGitHubOrgAllUsers");
const findOrgOnGH = require("./queryFuncs/findOrgOnGH");
const findTokenByTeamId = require("./queryFuncs/findTokenByTeamId");
const gitHubDeleteRepo = require("./gitFuncs/gitHubDeleteRepo");
const gitHubInstall = require("./gitFuncs/gitHubInstall");
const gitHubSetRepoHook = require("./gitFuncs/gitHubInstall");
const giveGold = require("./slackFuncs/giveGold");
const pullReqAchieveFunc = require("../server/webhookFuncs/pullReqAchieveFunc");
const pullRequestAchievements = require("../server/webhookFuncs/pullRequestAchievements");
const questDisplay = require("./slackFuncs/questDisplay");
const questLog = require("./slackFuncs/questLog");
const slackInstallAuth = require("./slackFuncs/slackInstallAuth");
const titles = require("../server/webhookFuncs/titles");
const updateQuestsOnPR = require("./webhookFuncs/updateQuestsOnPR");
const updateUserGitHub = require("./gitFuncs/updateUserGitHub");
const updateUserOnPR = require("../server/webhookFuncs/updateUserOnPR");
const userLevelFunc = require("../server/webhookFuncs/userLevelFunc");
const userTitleFunc = require("../server/webhookFuncs/userTitleFunc");
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
	findAllActiveQuestPerUser,
	findAllActiveQuests,
	findAllOrgRepos,
	findAllReposInDB,
	findAllWorkSpaceRepos,
	findAvailableQuests,
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
