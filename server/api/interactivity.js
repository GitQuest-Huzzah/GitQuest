const {
	addAllOrgReposToDB,
	addNewQuest,
	adminAssignQuestComplete,
	createOrUpdateOrg,
	gitHubDeleteRepo,
	giveGold,
	questLog,
	updateUserGitHub,
	viewQuests,
	gitHubSetRepoHook,
} = require("../../helperFuncs");

const {
	achievementsModal,
	addQuestModal,
	adminAssignQuestCompleteModal,
	adminDeleteRepoModal,
	adminGitConnectUserModal,
	adminOrgModal,
	adminRepoModal,
	giveGoldModal,
	goldLogModal,
	profileModal,
	questActivityModal,
	questActivityGraphModal,
	questLogModal,
	viewQuestsModal,
} = require("../../homeTab");

const router = require("express").Router();

//path is api/interactivity
//all captured data from interactive slack messages hit this endpoint
router.post("/", (req, res, next) => {
	const parsedSubmission = JSON.parse(req.body.payload);
	if (parsedSubmission.type === "block_actions") {
		if (parsedSubmission.actions[0].action_id === "adminOrgModalButton")
			adminOrgModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "adminRepoModalButton")
			adminRepoModal(parsedSubmission);
		if (
			parsedSubmission.actions[0].action_id === "adminGitConnectUserModalButton"
		)
			adminGitConnectUserModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "adminRepoDeleteModalButton")
			adminDeleteRepoModal(parsedSubmission);
		res.sendStatus(200);
		if (parsedSubmission.actions[0].action_id === "goldLogButton")
			goldLogModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "achievementButton")
			achievementsModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "giveGoldButton")
			giveGoldModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "addQuestButton")
			addQuestModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "viewQuestsButton")
			viewQuestsModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "profileButton")
			profileModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "questLogButton")
			questLogModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "assignQuestCompleteButton")
			adminAssignQuestCompleteModal(parsedSubmission);
		if (parsedSubmission.actions[0].action_id === "questActivityButton")
			questActivityModal(parsedSubmission);
	}

	if (parsedSubmission.type === "view_submission") {
		if (parsedSubmission.view.callback_id === "questActivityGraphSubmit") {
			questActivityGraphModal(parsedSubmission);
		}
		if (parsedSubmission.view.callback_id === "adminAddReposSubmit") {
			addAllOrgReposToDB(parsedSubmission);
			gitHubSetRepoHook(parsedSubmission);
		}
		if (parsedSubmission.view.callback_id === "adminAddOrgSubmit") {
			createOrUpdateOrg(parsedSubmission);
		}
		if (parsedSubmission.view.callback_id === "adminGitConnectUserSubmit") {
			updateUserGitHub(parsedSubmission);
		}
		if (parsedSubmission.view.callback_id === "adminDeleteReposSubmit") {
			gitHubDeleteRepo(parsedSubmission);
		}
		if (parsedSubmission.view.callback_id === "giveGoldSubmit") {
			giveGold(parsedSubmission);
		}
		if (parsedSubmission.view.callback_id === "addQuestSubmit") {
			addNewQuest(parsedSubmission);
		}
		if (parsedSubmission.view.callback_id === "viewQuestsSubmit") {
			viewQuests(parsedSubmission);
		}
		if (parsedSubmission.view.callback_id === "questLogSubmit") {
			questLog(parsedSubmission);
		}
		if (parsedSubmission.view.callback_id === "assignQuestCompleteSubmit") {
			adminAssignQuestComplete(parsedSubmission);
		}
		res.send({ response_action: "clear" });
	}
});

module.exports = router;
