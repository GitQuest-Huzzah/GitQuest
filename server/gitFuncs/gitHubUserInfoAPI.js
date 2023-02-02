const { Octokit } = require("@octokit/core");
const { Users } = require("../db");

//find a user's slackID to supply the GH API with access Token
//the reqBody is the req.body from a slack command received at it's associated endpoint
const gitHubUserInfoAPI = async (reqBody) => {
	const user = await Users.findOne({
		where: {
			slackID: reqBody.user_id,
		},
	});

	//creating a new instance of the GH API to poll the API which takes GH token as Auth headers
	const octokit = new Octokit({
		auth: user.dataValues.gitHubToken,
	});

	//request to get all commits from a specific repo
	const gitHubCommits = await octokit.request(
		"GET /repos/{owner}/{repo}/commits",
		{
			owner: "GitQuest-Huzzah",
			repo: "GitQuest",
		}
	);
};

module.exports = gitHubUserInfoAPI;
