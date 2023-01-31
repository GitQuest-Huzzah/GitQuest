const { WebClient } = require("@slack/web-api");
const { Users, Workspaces } = require("../db/index.js");
const { findOrgOnGH } = require("../gitFuncs/commands.js");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

//gitWorkFlow responds to the call of /git on the app, which hits the path /api/commands/git
const gitWorkFlow = async (reqBody, res) => {
	await web.chat.postMessage({
		text: "Step 1. Gently, yet firmly, remove your head from your ass. Can you see? Excellent.",
		channel: reqBody.user_id,
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
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
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
	});
};

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

//responds to command /connectgit
//this sends a DM to the user with a link to connect their GH account to our app
const sendGitHubAuthLink = async (reqBody, res) => {
	const githubClientId = "a8acd4f185488b3664c5";
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
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
	});
};

// Listen to the app_home_opened Events API event to hear when a user opens your app from the sidebar
const homeTab = async (reqBody) => {
	try {
		// Call the views.publish method using the WebClient passed to listeners
		const result = await web.views.publish({
			user_id: reqBody.event.user,
			token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
			view: {
				// Home tabs must be enabled in your app configuration page under "App Home"
				type: "home",
				blocks: [
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: "Hey there big boy",
						},
					},
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>.",
						},
					},
					{
						type: "divider",
					},
					{
						type: "context",
						elements: [
							{
								type: "mrkdwn",
								text: "Psssst this home tab was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>",
							},
						],
					},
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: "This is a section block with a button.",
						},
						accessory: {
							type: "button",
							text: {
								type: "plain_text",
								text: "Click Me",
								emoji: true,
							},
							value: "click_me_123",
							action_id: "adminOrgModalButton",
						},
					},
				],
			},
		});

		// console.log(result);
	} catch (error) {
		console.error(error);
	}
};

const adminOrgModal = async (reqBody) => {
	console.log(reqBody);
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
		view: {
			type: "modal",
			title: {
				type: "plain_text",
				text: "Adding Repo to Watch",
				emoji: true,
			},
			submit: {
				type: "plain_text",
				text: "Submit",
				emoji: true,
			},
			close: {
				type: "plain_text",
				text: "Cancel",
				emoji: true,
			},
			blocks: [
				{
					type: "input",
					block_id: "OwnerName",
					element: {
						type: "plain_text_input",
						action_id: "Owner_Input",
					},
					label: {
						type: "plain_text",
						text: "Owner or Org",
						emoji: true,
					},
				},
			],
		},
	});
};
const adminOrgModalResponse = async (reqBody) => {
	console.log(reqBody);
	await web.views.open({
		response_action: "update",
		view: {
			type: "modal",
			title: {
				type: "plain_text",
				text: "Updated view",
			},
			blocks: [
				{
					type: "section",
					text: {
						type: "plain_text",
						text: "I've changed and I'll never be the same. You must believe me.",
					},
				},
			],
		},
	});
};

const createOrUpdateOrg = async ({team_id, orgName}) => {
	const orgToUpdate = await Workspaces.findOne({
		where: {
			teamID: team_id,
		},
	});
	const doesOrgExist = await findOrgOnGH(orgName)
	if(doesOrgExist){
		await orgToUpdate.update({ orgName:orgName });
		
	}

};

module.exports = {
	adminOrgModal,
	adminOrgModalResponse,
	blockTest,
	createOrUpdateOrg,
	gitWorkFlow,
	homeTab,
	sendGitHubAuthLink,
	slackInstallAuth,
};
