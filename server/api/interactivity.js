const { adminOrgModal, createOrUpdateOrg } = require("../slackFuncs/commands");

const router = require("express").Router();

//path is api/interactivity
//all captured data from interactive slack messages hit this endpoint
router.post("/", (req, res, next) => {
	const parsedSubmission = JSON.parse(req.body.payload);
	console.log(parsedSubmission);
	if (parsedSubmission.type === "block_actions") {
		if (
			parsedSubmission.actions[0].action_id &&
			parsedSubmission.actions[0].action_id === "adminOrgModalButton"
		)
			adminOrgModal(parsedSubmission);
		res.sendStatus(200);
	}
	if (parsedSubmission.type === "view_submission") {
		res.send({ response_action: "clear" });
		console.log(parsedSubmission.view.state.values.OwnerName.Owner_Input.value);
		createOrUpdateOrg({
			team_id: parsedSubmission.view.team_id,
			orgName: parsedSubmission.view.state.values.OwnerName.Owner_Input.value,
		});
	}
});

module.exports = router;
