const { WebClient } = require("@slack/web-api");
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

	console.log(req.query, "this is the req query");
	const accessFunction = await web.oauth.v2.access({
		code: req.query.code,
		client_id: "4706667577361.4706675007441",
		client_secret: "9bfcc36a2b43abce2e9dfc6b108cbb24",
	});
    console.log(accessFunction, "this is the access v2 attempt")
};
module.exports = { gitWorkFlow, slackInstallAuth, blockTest };
