const {
	gitWorkFlow,
	blockTest,
	bangedMom,
	signUpWithGitHub,
} = require("../slackFuncs/commands");
const router = require("express").Router();

router.post("/", (req, res, next) => {
	res.sendStatus(200);
});
router.post("/git", (req, res, next) => {
	res.sendStatus(200);
	console.log("/git route being hit", req.body);
	gitWorkFlow(req.body);
});
router.post("/mom", (req, res, next) => {
	res.sendStatus(200);
	console.log("/mom route being hit", req.body);
	bangedMom(req.body);
});

router.post("/block", (req, res, next) => {
	res.sendStatus(200);
	console.log("/block route being hit", req.body);
	blockTest(req.body);
});

router.post("/connectgit", (req, res, next) => {
	res.sendStatus(200);
	console.log(req.body, "/connectgit route being hit");
	signUpWithGitHub(req.body);
});

module.exports = router;
