const router = require("express").Router();
const fs = require("fs");
const updateUserOnPR = require("../webhookFuncs/updateUserOnPR");

//path is /api/webhook
router.post("/", (req, res) => {
	res.status(204);

	if (req.body.action === "closed" && req.body.pull_request.merged === true) {
		updateUserOnPR(req.body);
	}
});

module.exports = router;
