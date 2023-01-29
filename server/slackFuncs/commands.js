const { WebClient } = require("@slack/web-api");
const { Users, Workspaces } = require("../db/index.js");
const web = new WebClient();

const gitWorkFlow = async (reqBody, res) => {
	await web.chat.postMessage({
		text: "Step 1. Gently, yet firmly, remove your head from your ass. Can you see? Excellent.",
		channel: reqBody.user_id,
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
	});
};

const blockTest = async (reqBody, res) => {
	await web.chat.postMessage({
        "blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Who's code is the least shit?* Poll by *Your Mom*"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":man: *Bobby B*\nHottest dude in Denver."
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Vote"
				},
				"value": "click_me_123",
				"action_id": "bob"
			}
		},
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": ":cat: *Corbin Campbell*\nSuper pissed."
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"emoji": true,
					"text": "Vote"
				},
				"value": "click_me_123",
				"action_id": "corbin"
			}
		},
		{
			"type": "actions",
			"elements": [
				{
					"type": "button",
					"text": {
						"type": "plain_text",
						"text": "Click Me",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "actionId-0"
				}
			]
		}
	],
		channel: reqBody.channel_id,
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
	});
};
const bangedMom = async (reqBody, res) => {
	console.log("/mom REQ.BODY", reqBody);
	await web.chat.postMessage({
		blocks: [
			{
				type: "input",
				element: {
					type: "number_input",
					is_decimal_allowed: false,
					action_id: "number_input-action",
				},
				label: {
					type: "plain_text",
					text: "Number of times you've banged Bob's Mom:",
					emoji: true,
				},
			},
		],
		channel: reqBody.channel_id,
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
	});
};

const slackInstallAuth = async (req, res) => {
	const installRequest = await web.oauth.v2.access({
		code: req.query.code,
		client_id: "4706667577361.4706675007441",
		client_secret: "9bfcc36a2b43abce2e9dfc6b108cbb24",
	});

	const adminUser = await Users.create({
		slackID: installRequest.authed_user.id,
		isAdmin: true,
	});
	const newWorkspace = await Workspaces.create({
		botToken: installRequest.access_token,
		teamID: installRequest.team.id,
		teamName: installRequest.team.name,
	});
	await adminUser.setWorkspaces(newWorkspace);
};


const sendGitHubAuthLink = async (reqBody, res) => {
	const githubClientId = "a8acd4f185488b3664c5"
	const userInfo = JSON.stringify({userId:reqBody.user_id, teamId: reqBody.team_id})
	const bufferUTFObj = Buffer.from(userInfo, "utf8");
	const base64String = bufferUTFObj.toString("base64");

	await web.chat.postMessage({
		text: `<https://github.com/login/oauth/authorize?client_id=${githubClientId}&scope=repo,read:status,read:repo_hook,read:org,read:user,read:email,read:discussion&state=${base64String}/>  This message to link your gitHub account`,
		channel: reqBody.user_id,
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
	});
}; 

module.exports = { sendGitHubAuthLink, gitWorkFlow, slackInstallAuth, blockTest };
