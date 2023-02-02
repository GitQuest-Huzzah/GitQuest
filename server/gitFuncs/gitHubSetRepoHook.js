const { Octokit } = require("@octokit/core");
const { Users, Workspaces } = require("../db");

const gitHubSetRepoHook = async (reqBody) => {
	const user = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include: Workspaces,
	});

	const octokit = new Octokit({
		auth: "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",
		// needs to be user.gitToken
	});

	const repos =
		reqBody.view.state.values.adminRepoModal.adminRepoModalAction
			.selected_options;

	repos.forEach(async (repo) => {
		await octokit.request("POST /repos/{owner}/{repo}/hooks", {
			owner: user.dataValues.workspace.dataValues.orgName,
			repo: repo.text.text,
			name: "web",
			active: true,
			events: ["push", "pull_request"],
			config: {
				url: "https://gitquest.fun/api/webhook",
				content_type: "json",
				insecure_ssl: "0",
			},
		});
	});
};

module.exports = gitHubSetRepoHook;
