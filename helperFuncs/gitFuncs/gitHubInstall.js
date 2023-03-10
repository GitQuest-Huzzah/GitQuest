const axios = require("axios");

const { User, Workspace } = require("../../server/db");

const gitHubInstall = async (req) => {
	try {
		//we are decoding the state variable containing user information
		const buffer64Obj = Buffer.from(req.query.state, "base64");
		//we turn that base64 buffer into a utf8 string
		const decodedString = buffer64Obj.toString("utf8");
		//we finally parse that string into a readable JSON
		const parsedUserInfo = JSON.parse(decodedString);
		//body is the request body where we exchange our temporary code for a GH access token
		const body = {
			client_id: process.env.GITHUB_CLIENT_ID,
			client_secret: process.env.GITHUB_CLIENT_SECRET,
			code: req.query.code,
		};
		//opts is the headers which contain the format of the response we would like from GH
		//we then proceed to make that call to GH to exchange code for token
		const opts = { headers: { accept: "application/json" } };

		const res = await axios.post(
			`https://github.com/login/oauth/access_token`,
			body,
			opts
		);
		//check to see if a user with the associated user information already exists
		const userAlreadyExists = await User.findOne({
			where: {
				slackID: parsedUserInfo.userId,
			},
			include: {
				model: Workspace,
			},
		});
		//if the user exists we update their GH access token
		if (userAlreadyExists) {
			return await userAlreadyExists.update({
				gitHubToken: res.data.access_token,
			});
		}
		//if the user is new and not found we create one and assign it to it's associated workspace
		const newUsersWorkspace = await Workspace.findOne({
			where: {
				teamID: parsedUserInfo.teamId,
			},
		});
		const newUser = await User.create({
			slackID: parsedUserInfo.userId,
			gitHubToken: res.data.access_token,
		});
		await newUser.setWorkspace(newUsersWorkspace);
		return newUser;
	} catch (error) {
		console.error(error);
	}
};

module.exports = gitHubInstall;
