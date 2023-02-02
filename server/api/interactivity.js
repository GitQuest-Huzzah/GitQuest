const {
	addAllOrgReposToDB,
	getAllOrgRepos,
	gitHubSetRepoHook,
	updateUserGitHub,
} = require("../gitFuncs");

const {
	adminOrgModal,
	adminRepoModal,
	createOrUpdateOrg,
	adminGitConnectUserModal,
} = require("../slackFuncs");

const router = require("express").Router();

//path is api/interactivity
//all captured data from interactive slack messages hit this endpoint
router.post("/", (req, res, next) => {
	const parsedSubmission = JSON.parse(req.body.payload);
	if (parsedSubmission.type === "block_actions") {
		// console.log(parsedSubmission)
		if (
			parsedSubmission.actions[0].action_id &&
			parsedSubmission.actions[0].action_id === "adminOrgModalButton"
		)
			adminOrgModal(parsedSubmission);
		if (
			parsedSubmission.actions[0].action_id &&
			parsedSubmission.actions[0].action_id === "adminRepoModalButton"
		)
			adminRepoModal(parsedSubmission);
		if (
			parsedSubmission.actions[0].action_id &&
			parsedSubmission.actions[0].action_id === "adminGitConnectUserModalButton"
		)
			adminGitConnectUserModal(parsedSubmission)
		res.sendStatus(200);
	}

	if (
		parsedSubmission.view.external_id === "adminAddReposSubmit" &&
		parsedSubmission.type === "view_submission"
	) {
		res.send({ response_action: "clear" });
		addAllOrgReposToDB(parsedSubmission);
		gitHubSetRepoHook(parsedSubmission);
	}

	if (
		parsedSubmission.view.external_id === "adminAddOrgSubmit" &&
		parsedSubmission.type === "view_submission"
	) {
		res.send({ response_action: "clear" });
			createOrUpdateOrg(parsedSubmission);
	}
	if (
		parsedSubmission.view.external_id === "adminGitConnectUserSubmit" &&
		parsedSubmission.type === "view_submission"
	) {
		res.send({ response_action: "clear" });
			updateUserGitHub(parsedSubmission);
	}
});

module.exports = router;
