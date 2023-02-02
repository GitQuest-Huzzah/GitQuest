const { Octokit } = require("@octokit/core");
const { Users, Workspaces } = require("../db");


const getAllOrgRepos = async (reqBody) => {
	const octokit = new Octokit({
		auth: "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",
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
			model: Workspaces,
		},
	});
	return await octokit.request("GET /orgs/{owner}/repos", {
		owner: orgName, //these need to be set to receive from the found user
	});
};

module.exports = getAllOrgRepos;
