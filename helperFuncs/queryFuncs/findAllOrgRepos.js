const { Octokit } = require("@octokit/core");
const { User, Workspace } = require("../../server/db");
const findGitHubAPIToken = require("./findGitHubAPIToken");

const findAllOrgRepos = async (reqBody) => {
	const token = await findGitHubAPIToken(reqBody);
	const octokit = new Octokit({
		auth: token,
	});
	const {
		dataValues: {
			workspace: {
				dataValues: { orgName, ghType },
			},
		},
	} = await User.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include: {
			model: Workspace,
		},
	});
	return ghType === "organization" ? await octokit.request("GET /orgs/{owner}/repos", {
		owner: orgName, //these need to be set to receive from the found user
	}) : await octokit.request("GET /user/repos", {affiliation:"owner"})
};

module.exports = findAllOrgRepos;
