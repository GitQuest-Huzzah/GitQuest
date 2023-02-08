const homeTab = require("./homeTab");
const { adminHomeView, userHomeView } = require("./views");
const {
	achievementsModal,
	addQuestModal,
	adminDeleteRepoModal,
	adminGitConnectUserModal,
	adminOrgModal,
	adminRepoModal,
	giveGoldModal,
	goldLogModal,
	profileModal,
	viewQuestsModal,
} = require("./modals");
const {
	externalGitHubUserConnectSelectMenu,
	externalQuestSelect,
	externalRepoDeleteSeletMenu,
	externalRepoSelectMenu,
} = require("./externalSelectMenus");

module.exports = {
	achievementsModal,
	addQuestModal,
	adminDeleteRepoModal,
	adminGitConnectUserModal,
	adminHomeView,
	adminOrgModal,
	adminRepoModal,
	externalGitHubUserConnectSelectMenu,
	externalQuestSelect,
	externalRepoDeleteSeletMenu,
	externalRepoSelectMenu,
	giveGoldModal,
	goldLogModal,
	homeTab,
	profileModal,
	userHomeView,
	viewQuestsModal,
};
