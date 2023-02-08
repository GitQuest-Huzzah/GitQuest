const { gitHubSetRepoHook, gitHubInstall } = require("../../apiFuncs/gitFuncs");
const router = require("express").Router();

//path is /api/github/auth/redirect
router.get("/auth/redirect", (req, res, next) => {
	gitHubInstall(req);
	res.json({ git: "authorized" });
});

//path is api/github/setrepo
router.post("/setrepo", (req, res, next) => {
	res.sendStatus(200);
	const [owner, repo] = req.body.text.split(" ");
	gitHubSetRepoHook({ ...req.body, owner: owner, repo: repo });
});

module.exports = router;
