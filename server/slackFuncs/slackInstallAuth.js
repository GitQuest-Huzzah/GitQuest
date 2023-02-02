const { WebClient } = require("@slack/web-api");
const { Users, Workspaces } = require("../db");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
//slackInstallAuth responds to the redirect from a user agreeing to install the app on a workspace, which hits the path /api/slack/install/redirect
// the first block takes the code given by agreeing to install, and supplies the associated slack app information and then exchanges it for a official bot token
const slackInstallAuth = async (req, res) => {
	const installRequest = await web.oauth.v2.access({
		code: req.query.code,
		client_id: "4706667577361.4706675007441",
		client_secret: "9bfcc36a2b43abce2e9dfc6b108cbb24",
	});
	//adminUser block sets the installer of the app on a workspace as the admin for that workspace
	const adminUser = await Users.create({
		slackID: installRequest.authed_user.id,
		isAdmin: true,
	});
	//on install this also creates an associated workspace for the newly installed app
	const newWorkspace = await Workspaces.create({
		botToken: installRequest.access_token,
		teamID: installRequest.team.id,
		teamName: installRequest.team.name,
	});
	//list all users in the workspace
	const result = await web.users.list({
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
	});
	//filter out bots, the admin who was just created, and slackbot which is not labeled as a bot
	const filteredMembers = result.members.filter(
		(member) =>
			member["is_bot"] === false &&
			member["name"] !== "slackbot" &&
			member["id"] !== installRequest.authed_user.id
	);
	//we then create an entry for each user and set their workspace to the new workspace
	filteredMembers.forEach(async (user) => {
		const newUser = await Users.create({
			slackID: user["id"],
		});
		await newUser.setWorkspace(newWorkspace);
	});
	await adminUser.setWorkspace(newWorkspace);
};

module.exports = slackInstallAuth;
