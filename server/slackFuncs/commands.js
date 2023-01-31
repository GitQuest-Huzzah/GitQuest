const { WebClient } = require("@slack/web-api");
const { Users, Workspaces } = require("../db/index.js");

//instantiating an instance of the slack Web Client API
const web = new WebClient();

//gitWorkFlow responds to the call of /git on the app, which hits the path /api/commands/git
const gitWorkFlow = async (reqBody, res) => {
	await web.chat.postMessage({
		text: "Step 1. Gently, yet firmly, remove your head from your ass. Can you see? Excellent.",
		channel: reqBody.user_id,
		token: "***REMOVED***",
	});
};

//blockTest responds to the call of /block on the app, which hits the path /api/commands/block
const blockTest = async (reqBody, res) => {
	await web.chat.postMessage({
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: "*Who's code is the least shit?* Poll by *Your Mom*",
				},
			},
			{
				type: "divider",
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: ":man: *Bobby B*\nHottest dude in Denver.",
				},
				accessory: {
					type: "button",
					text: {
						type: "plain_text",
						emoji: true,
						text: "Vote",
					},
					value: "click_me_123",
					action_id: "bob",
				},
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: ":cat: *Corbin Campbell*\nSuper pissed.",
				},
				accessory: {
					type: "button",
					text: {
						type: "plain_text",
						emoji: true,
						text: "Vote",
					},
					value: "click_me_123",
					action_id: "corbin",
				},
			},
			{
				type: "actions",
				elements: [
					{
						type: "button",
						text: {
							type: "plain_text",
							text: "Click Me",
							emoji: true,
						},
						value: "click_me_123",
						action_id: "actionId-0",
					},
				],
			},
		],
		channel: reqBody.channel_id,
		token: "***REMOVED***",
	});
};

//slackInstallAuth responds to the redirect from a user agreeing to install the app on a workspace, which hits the path /api/slack/install/redirect
// the first block takes the code given by agreeing to install, and supplies the associated slack app information and then exchanges it for a official bot token
const slackInstallAuth = async (req, res) => {
	const installRequest = await web.oauth.v2.access({
		code: req.query.code,
		client_id: "***REMOVED***",
		client_secret: "***REMOVED***",
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

	const result = await web.users.list({
		token: "***REMOVED***",
	});
	const filteredMembers = result.members.filter(
		(member) => member["is_bot"] === false && member["name"] !== "slackbot"
	);
	console.log(filteredMembers)
	filteredMembers.forEach(async (user) => {
		const newUser = await Users.create({
			slackID: user["id"],
		});
		await newUser.setWorkspace(newWorkspace);
	});
	await adminUser.setWorkspace(newWorkspace);
};

//responds to command /connectgit
//this sends a DM to the user with a link to connect their GH account to our app
const sendGitHubAuthLink = async (reqBody, res) => {
	const githubClientId = "***REMOVED***";
	//here we create an object with the pertanent user infomation and stringify.
	const userInfo = JSON.stringify({
		userId: reqBody.user_id,
		teamId: reqBody.team_id,
	});
	//we are turning the string into a buffer
	const bufferUTFObj = Buffer.from(userInfo, "utf8");
	//this transforms the buffer into a base64 string before sending it so the user in the link on the optional state parameter
	const base64String = bufferUTFObj.toString("base64");

	//this is the message sent to user which has all scopes and the optional state containing user information
	await web.chat.postMessage({
		text: `<https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=repo,read:status,read:repo_hook,read:org,read:user,read:email,read:discussion&state=${base64String}/>  This message to link your gitHub account`,
		channel: reqBody.user_id,
		token: "***REMOVED***",
	});
};

module.exports = {
	sendGitHubAuthLink,
	gitWorkFlow,
	slackInstallAuth,
	blockTest,
};
