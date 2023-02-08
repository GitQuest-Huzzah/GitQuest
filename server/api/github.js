const { gitHubSetRepoHook, gitHubInstall } = require("../gitFuncs");
const router = require("express").Router();

//path is /api/github/auth/redirect
router.get("/auth/redirect", async (req, res, next) => {
	const GHsuccess = await gitHubInstall(req);
	GHsuccess.dataValues.gitHubToken
		? res.send(
				`<script>
					{" "}
					window.alert("You Have successfully connected your GitHub Account!");
					window.close()
				</script>`
		  )
		: res.send(
				`<script>
					{" "}
					window.alert("Looks like something went wrong please contact GitQuest
					for help or try again!); window.close()
				</script>`
		  );
});

//path is api/github/setrepo
router.post("/setrepo", (req, res, next) => {
	res.sendStatus(200);
	const [owner, repo] = req.body.text.split(" ");
	gitHubSetRepoHook({ ...req.body, owner: owner, repo: repo });
});

module.exports = router;
