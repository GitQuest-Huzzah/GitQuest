const { WebClient } = require("@slack/web-api");
const web = new WebClient();

const gitWorkFlow = async (reqBody, res) => {
    console.log("This is the req body", reqBody);
    await web.chat.postMessage({
        text: "Hello world",
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


const slackInstallAuth = async (req, res)=>{
    console.log(req.query,"this is the req query")
    web.oauth.v2.access({code:req.query.code, client_id:4706667577361.4706675007441})
}
module.exports = {gitWorkFlow, slackInstallAuth, blockTest }

