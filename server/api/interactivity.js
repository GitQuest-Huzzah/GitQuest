const { getAllOrgRepos, addAllOrgReposToDB } = require("../gitFuncs/commands");
const {
	adminOrgModal,
	adminRepoModal,
	createOrUpdateOrg,
} = require("../slackFuncs/commands");

const router = require("express").Router();

//path is api/interactivity
//all captured data from interactive slack messages hit this endpoint
router.post("/", (req, res, next) => {
	console.log(req, "interactivity");
	const parsedSubmission = JSON.parse(req.body.payload);
	if (parsedSubmission.type === "block_actions") {
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
		res.sendStatus(200);
	}
	if (parsedSubmission.type === "view_submission") {
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
