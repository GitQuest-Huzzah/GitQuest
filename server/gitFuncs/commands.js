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
const gitHubSetRepoHook = async (reqBody) => {
	const octokit = new Octokit({
		auth: "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",
	});

	await octokit.request("POST /repos/{owner}/{repo}/hooks", {
		owner: reqBody.owner,
		repo: reqBody.repo,
		name: "web",
		active: true,
		events: ["push", "pull_request"],
		config: {
			url: "https://gitquest.fun/api/webhook",
			content_type: "json",
			insecure_ssl: "0",
		},
	});
};

const getAllOrgRepos = async (reqBody) => {
	const octokit = new Octokit({
		auth: "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",
	});
	const organization = await Users.findOne({
		where: {
			slackID: reqBody.user_id,
		},
		include: {
			model: Workspaces,
		},
	});
	const orgGitHubRepos = await octokit.request("GET /orgs/{owner}/{repo}/", {
		owner: "GitQuest-Huzzah",//these need to be set to receive from the found user
		repo: "GitQuest",
	});
};

const findOrgOnGH = async (orgName) =>{
	const octokit = new Octokit({
		auth: "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",
	});
	try{
		const organization = await octokit.request("GET /orgs/{owner}", {
			owner: orgName
		})
		return organization;
	}catch(error){
		console.error(error)
	}
}

module.exports = { findOrgOnGH, gitHubUserInfoAPI, gitHubSetRepoHook };
