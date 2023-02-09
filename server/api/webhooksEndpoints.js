const router = require("express").Router();
const { addPRIDToQuest, updateQuestsOnPR, updateUserOnPR } = require("../../helperFuncs");

//path is /api/webhook
router.post("/", (req, res) => {
	res.status(204);

	if (req.body.action === "opened") {
		addPRIDToQuest(req.body);
	}
	if (req.body.action === "closed" && req.body.pull_request.merged === true) {
		updateUserOnPR(req.body);
		updateQuestsOnPR(req.body);
	}
});

module.exports = router;
