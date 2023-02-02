const {
	addAllOrgReposToDB,
	getAllOrgRepos,
	gitHubSetRepoHook,
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
		gitHubSetRepoHook(parsedSubmission);
	}

	if (
		parsedSubmission.view.external_id === "adminAddOrgSubmit" &&
		parsedSubmission.type === "view_submission"
	) {
		res.send({ response_action: "clear" });
		(async () => {
			await createOrUpdateOrg({
				team_id: parsedSubmission.view.team_id,
				orgName: parsedSubmission.view.state.values.OwnerName.Owner_Input.value,
			});
			const repos = await getAllOrgRepos(parsedSubmission);
			await addAllOrgReposToDB(repos, parsedSubmission);
		})();
	}
});

module.exports = router;
