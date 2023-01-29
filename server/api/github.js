const axios = require("axios");
const { Users, Workspaces } = require("../db");
const gitHubUserInfoAPI = require("../gitFuncs/commands");
const router = require("express").Router();

const githubClientId = "***REMOVED***";
const githubClientSecret = "***REMOVED***";

//path is /api/github/auth/redirect
router.get("/auth/redirect", (req, res, next) => {
	res.json({ git: "authorized" });

	const buffer64Obj = Buffer.from(req.query.state, "base64");
	const decodedString = buffer64Obj.toString("utf8");
	const parsedUserInfo = JSON.parse(decodedString);

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
			const newUsersWorkspace = await Workspaces.findOne({
				where: {
					teamID: parsedUserInfo.teamId,
				},
			});
			const newUser = await Users.create({
				slackID: parsedUserInfo.userId,
				gitHubToken: res.data.access_token,
			});
			return await newUser.setWorkspaces(newUsersWorkspace);
		} catch (error) {
			console.error(error);
		}
	})();
});

//path is /api/github/userinfo
router.post("/userinfo", (req, res, next) => {
	res.sendStatus(200);
	gitHubUserInfoAPI(req.body);
});

module.exports = router;
