const achievementsModal = require("./achievementsModal");
const addQuest = require("./addQuest");
const addQuestModal = require("./addQuestModal");
const adminGitConnectUserModal = require("./adminGitConnectUserModal");
const adminHomeView = require('./adminHomeView')
const adminOrgModal = require("./adminOrgModal");
const adminRepoModal = require("./adminRepoModal");
const blockTest = require("./blockTest");
const createOrUpdateOrg = require("./createOrUpdateOrg");
const findAllActiveQuestsPerUser = require('./findAllActiveQuestPerUser')
const findAllAvailableQuests = require('./findAllAvailableQuests')
const findAllWorkSpaceRepos = require("./findAllWorkSpaceRepos");
const findTokenByTeamId = require("./findTokenByTeam");
const gitWorkFlow = require("./gitWorkFlow");
const giveGold = require("./giveGold");
const giveGoldModal = require("./giveGoldModal");
const goldLogModal = require("./goldLogModal");
const homeTab = require("./homeTab");
const profileModal = require('./profileModal');
const questLog = require('./questLog')
const questLogModal = require('./questLogModal')
const slackInstallAuth = require("./slackInstallAuth");
const viewQuests = require('./viewQuests')
const viewQuestsModal = require('./viewQuestsModal')
module.exports = {
    achievementsModal,
    addQuest,
    addQuestModal,
    adminGitConnectUserModal,
    adminHomeView,
    adminOrgModal,
    adminRepoModal,
    blockTest,
    createOrUpdateOrg,
    findAllActiveQuestsPerUser,
    findAllAvailableQuests,
    findAllWorkSpaceRepos,
    findTokenByTeamId,
    giveGoldModal,
    gitWorkFlow,
    giveGold,
    goldLogModal,
    homeTab,
	profileModal,
    questLog, 
    questLogModal,
	slackInstallAuth,
    viewQuests,
    viewQuestsModal
};
