const axios = require("axios");
const { Users, Workspaces } = require("../db");
const gitHubUserInfoAPI = require("../gitFuncs/commands");
const router = require("express").Router();

const githubClientId = "***REMOVED***";
const githubClientSecret = "***REMOVED***";

//path is /api/github/auth/connect
router.get("/auth/connect", async (req, res, next) => {
	console.log("connect route hit");
	res.redirect(
		`https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=repo:status,read:repo_hook,read:org,read:user,read:email,read:discussion`
	);
});

//path is /api/github/auth/redirect
router.get("/auth/redirect", (req, res, next) => {
	res.json({ git: "authorized" });
	console.log(req.query, "redirected query");

	const buffer64Obj = Buffer.from(req.query.state, "base64");
	const decodedString = buffer64Obj.toString("utf8");
	const parsedUserInfo = JSON.parse(decodedString);
	console.log("decoded userID", parsedUserInfo);

	const body = {
		client_id: githubClientId,
		client_secret: githubClientSecret,
		code: req.query.code,
	};
	const opts = { headers: { accept: "application/json" } };
	(async () => {
		try {
			const res = await axios.post(
				`https://github.com/login/oauth/access_token`,
				body,
				opts
			);
			const userAlreadyExists = await Users.findOne({
				where: {
					slackID: parsedUserInfo.userId,
				},
				include: {
					model: Workspaces,
				},
			});
			if (userAlreadyExists) {
				return await userAlreadyExists.update({
					gitHubToken: res.data.access_token,
				});
			}
			return await Users.create({
				slackID: parsedUserInfo.userId,
				gitHubToken: res.data.access_token,
			});
		} catch (error) {
			console.error(error);
		}
	})();
});

//path is /api/github/userinfo
router.post("/userinfo", (req, res, next) => {
	res.sendStatus(200);
	gitHubUserInfoAPI(req.body)
});

module.exports = router;
