const { WebClient } = require("@slack/web-api");
const {  Users, Workspaces } = require("../db/index.js");
const web = new WebClient();

const gitWorkFlow = async (reqBody, res) => {
	await web.chat.postMessage({
		text: "Step 1. Gently, yet firmly, remove your head from your ass. Can you see? Excellent.",
		channel: reqBody.user_id,
		token: "***REMOVED***",
	});
};

const blockTest = async (reqBody, res) => {
	await web.chat.postMessage({
		blocks: [
			{
				type: "section",
				text: {
					type: "plain_text",
					text: "This is a plain text section block.",
					emoji: true,
				},
			},
		],
		channel: reqBody.user_id,
		token: "***REMOVED***",
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
		token: "***REMOVED***",
	});
};

const slackInstallAuth = async (req, res) => {
	const installRequest = await web.oauth.v2.access({
		code: req.query.code,
		client_id: "***REMOVED***",
		client_secret: "***REMOVED***",
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
	await adminUser.setWorkspaces(newWorkspace) 
};
module.exports = { gitWorkFlow, slackInstallAuth, blockTest };
