const { Octokit } = require("@octokit/core");
const { Users, Workspace } = require("../../server/db");
const findGitHubAPIToken = require("./findGitHubAPIToken");

const findAllOrgRepos = async (reqBody) => {
	const token = await findGitHubAPIToken(reqBody);
	const octokit = new Octokit({
		auth: token,
	});
	const {
		dataValues: {
			workspace: {
				dataValues: { orgName },
			},
		},
	} = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include: {
			model: Workspace,
		},
	});
	return await octokit.request("GET /orgs/{owner}/repos", {
		owner: orgName, //these need to be set to receive from the found user
	});
};

module.exports = findAllOrgRepos;
