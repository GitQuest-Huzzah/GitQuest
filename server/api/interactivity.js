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
		const modal = {
			adminOrgModalButton: adminOrgModal,
			adminRepoModalButton: adminRepoModal,
			adminGitConnectUserModalButton: adminGitConnectUserModal,
			adminRepoDeleteModalButton: adminDeleteRepoModal,
			goldLogButton: goldLogModal,
			achievementButton: achievementsModal,
			giveGoldButton: giveGoldModal,
			addQuestButton: addQuestModal,
			viewQuestsButton: viewQuestsModal,
			profileButton: profileModal,
			questLogButton: questLogModal,
			assignQuestCompleteButton: adminAssignQuestCompleteModal,
			questActivityButton: questActivityModal,
		};
		const buttonClicked = parsedSubmission.actions[0].action_id;
		if (Object.keys(modal).includes(buttonClicked)) {
			modal[buttonClicked](parsedSubmission);
		}
		res.sendStatus(200);
	}

	if (parsedSubmission.type === "view_submission") {
		const submission = {
			questActivityGraphSubmit: [questActivityGraphModal],
			adminAddReposSubmit: [addAllOrgReposToDB, gitHubSetRepoHook],
			adminAddOrgSubmit: [createOrUpdateOrg],
			adminGitConnectUserSubmit: [updateUserGitHub],
			adminDeleteReposSubmit: [gitHubDeleteRepo],
			giveGoldSubmit: [giveGold],
			addQuestSubmit: [addNewQuest],
			viewQuestsSubmit: [viewQuests],
			questLogSubmit: [questLog],
			assignQuestCompleteSubmit: [adminAssignQuestComplete],
		};
		const inputSubmitted = parsedSubmission.view.callback_id;
		if (Object.keys(submission).includes(inputSubmitted)) {
			submission[inputSubmitted].forEach((submit) => submit(parsedSubmission));
		}
		res.send({ response_action: "clear" });
	}
});

module.exports = router;
