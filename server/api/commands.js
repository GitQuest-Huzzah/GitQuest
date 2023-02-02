const {
	blockTest,
	gitWorkFlow,
} = require("../slackFuncs");

const router = require("express").Router();

//poth is api/commands/git
router.post("/git", (req, res, next) => {
	res.sendStatus(200);
	gitWorkFlow(req.body);
});

//path is api/commands/block
router.post("/block", (req, res, next) => {
	res.sendStatus(200);
	blockTest(req.body);
});

module.exports = router;
