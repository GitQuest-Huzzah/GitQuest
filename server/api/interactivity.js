const {
	addAllOrgReposToDB,
	addNewQuest,
	adminAssignQuestComplete,
	createOrUpdateOrg,
	gitHubDeleteRepo,
	gitHubSetRepoHook,
	giveGold,
	questLog,
	updateUserGitHub,
	viewQuests,
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
router.post("/", (req, res) => {
	const parsedSubmission = JSON.parse(req.body.payload);
	if (parsedSubmission.type === "block_actions") {
		const modal = {
			achievementButton: achievementsModal,
			addQuestButton: addQuestModal,
			adminGitConnectUserModalButton: adminGitConnectUserModal,
			adminOrgModalButton: adminOrgModal,
			adminRepoDeleteModalButton: adminDeleteRepoModal,
			adminRepoModalButton: adminRepoModal,
			assignQuestCompleteButton: adminAssignQuestCompleteModal,
			giveGoldButton: giveGoldModal,
			goldLogButton: goldLogModal,
			profileButton: profileModal,
			questActivityButton: questActivityModal,
			questLogButton: questLogModal,
			viewQuestsButton: viewQuestsModal,
		};
		const buttonClicked = parsedSubmission.actions[0].action_id;
		if (Object.keys(modal).includes(buttonClicked)) {
			modal[buttonClicked](parsedSubmission);
		}
		res.sendStatus(200);
	}

	if (parsedSubmission.type === "view_submission") {
		const submission = {
			addQuestSubmit: [addNewQuest],
			adminAddOrgSubmit: [createOrUpdateOrg],
			adminAddReposSubmit: [addAllOrgReposToDB, gitHubSetRepoHook],
			adminDeleteReposSubmit: [gitHubDeleteRepo],
			adminGitConnectUserSubmit: [updateUserGitHub],
			assignQuestCompleteSubmit: [adminAssignQuestComplete],
			giveGoldSubmit: [giveGold],
			questActivityGraphSubmit: [questActivityGraphModal],
			questLogSubmit: [questLog],
			viewQuestsSubmit: [viewQuests],
		};
		const inputSubmitted = parsedSubmission.view.callback_id;
		if (Object.keys(submission).includes(inputSubmitted)) {
			submission[inputSubmitted].forEach((submit) => submit(parsedSubmission));
		}
		res.send({ response_action: "clear" });
	}
});

module.exports = router;
