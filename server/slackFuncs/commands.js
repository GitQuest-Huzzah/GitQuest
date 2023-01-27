const { WebClient, addAppMetadata } = require("@slack/web-api");
const Spaces_Users = require("../db/models/Spaces_Users");
const Users = require("../db/models/Users");
const Workspaces = require("../db/models/Workspaces");
const web = new WebClient();

const gitWorkFlow = async (reqBody, res) => {
    console.log("This is the req body", reqBody);
    await web.chat.postMessage({
        text: "Step 1. Gently, yet firmly, remove your head from your ass. Can you see? Excellent.",
        channel: reqBody.user_id,
        token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
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
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
	});
};
const bangedMom = async (reqBody, res) => {
    console.log("THIS IS THE REQBODY FOR BANGED MOM",reqBody)
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
    console.log(installRequest, "this is the access v2 attempt")

	const adminUser = await Users.create({
		slackID: installRequest.authed_user.id,
		isAdmin: true,
	})
	const newWorkspace = await Workspaces.create({
		botToken:installRequest.access_token,
		teamID: installRequest.team.id,
		teamName: installRequest.team.name,
	})
	console.log(adminUser.dataValues,"this is admin user", newWorkspace.dataValues,"this is new workspace")
	await Spaces_Users.create({
		userId: adminUser.dataValues.id,
		workspaceId: newWorkspace.dataValues.id
	})
};
module.exports = { gitWorkFlow, slackInstallAuth, blockTest };
