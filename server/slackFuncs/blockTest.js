const { WebClient } = require("@slack/web-api");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
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
        ],
        channel: reqBody.channel_id,
        token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
    });
};

module.exports = blockTest;
