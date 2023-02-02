const { WebClient } = require("@slack/web-api");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
//responds to command /connectgit
//this sends a DM to the user with a link to connect their GH account to our app
const sendGitHubAuthLink = async (reqBody, res) => {
	const githubClientId = "***REMOVED***";
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
		token: "***REMOVED***",
	});
};

module.exports= sendGitHubAuthLink;