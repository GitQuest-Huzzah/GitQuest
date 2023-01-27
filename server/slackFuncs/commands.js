const { WebClient } = require("@slack/web-api");
const web = new WebClient();

const gitWorkFlow = async (reqBody, res) => {
    console.log("This is the req body", reqBody);
    await web.chat.postMessage({
        text: "Hello world",
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

module.exports = {blockTest, gitWorkFlow};
