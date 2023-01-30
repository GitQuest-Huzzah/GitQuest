const {
	blockTest,
	gitWorkFlow,
	sendGitHubAuthLink,
} = require("../slackFuncs/commands");
const router = require("express").Router();

//poth is api/commands/git
router.post("/git", (req, res, next) => {
	res.sendStatus(200);
	console.log("/git route being hit", req.body);
	gitWorkFlow(req.body);
});

//path is api/commands/block
router.post("/block", (req, res, next) => {
	res.sendStatus(200);
	console.log("/block route being hit", req.body);
	blockTest(req.body);
});

//path is api/commands/connectgit
router.post("/connectgit", (req, res, next) => {
	res.sendStatus(200);
	console.log(req.body, "/connectgit route being hit");
	sendGitHubAuthLink(req.body);
});

module.exports = router;
