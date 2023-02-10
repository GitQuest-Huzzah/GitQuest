const { Octokit } = require("@octokit/core");
const { Workspaces } = require("../../server/db");
const findGitHubAPIToken = require("./findGitHubAPIToken");
//find a user's slackID to supply the GH API with access Token
//the reqBody is the req.body from a slack command received at it's associated endpoint
const findGitHubOrgAllUser = async (reqBody) => {
	const workspace = await Workspaces.findOne({
		where: {
			teamID: reqBody.user.team_id,
		},
	});
	const token = await findGitHubAPIToken(reqBody);
	//creating a new instance of the GH API to poll the API which takes GH token as Auth headers
	const octokit = new Octokit({
		auth: token,
	});

	//request to get all commits from a specific repo
	const allOrgMembers = await octokit.request("GET /orgs/{owner}/members", {
		owner: workspace.dataValues.orgName,
	});
	return allOrgMembers;
};

module.exports = findGitHubOrgAllUser;
