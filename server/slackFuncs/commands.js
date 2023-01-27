const { WebClient } = require("@slack/web-api");
const web = new WebClient();

const gitWorkFlow = async (reqBody, res) => {
    console.log("This is the req body", reqBody);
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
        token: "***REMOVED***",
    });
};

const slackInstallAuth = async (req, res) => {
    console.log(req.query, "this is the req query");
    web.oauth.v2.access(req.query.code);
};
module.exports = { gitWorkFlow, slackInstallAuth, blockTest, bangedMom };
