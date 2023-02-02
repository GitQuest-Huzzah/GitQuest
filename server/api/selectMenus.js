const {externalRepoSelectMenu, externalGitHubUserConnectSelectMenu}  = require("../externalSelectMenus");

const router = require("express").Router();

//path is api/selectMenus
router.post("/", async (req, res, next) => {
	const parsedSubmission = JSON.parse(req.body.payload);

	if (parsedSubmission.view.external_id === "adminAddReposSubmit") {
		res.send(await externalRepoSelectMenu(parsedSubmission)).status(200);
	}
	if (parsedSubmission.view.external_id === "adminGitConnectUserSubmit") {
		res.send(await externalGitHubUserConnectSelectMenu(parsedSubmission)).status(200);
	}
});

module.exports = router;
