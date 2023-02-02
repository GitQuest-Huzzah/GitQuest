const { WebClient } = require("@slack/web-api");
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

module.exports = gitWorkFlow;