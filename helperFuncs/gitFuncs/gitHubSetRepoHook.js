const { Octokit } = require("@octokit/core");
const { Users, Workspace } = require("../../server/db");
const findGitHubAPIToken = require("../queryFuncs/findGitHubAPIToken");

const gitHubSetRepoHook = async (reqBody) => {
	const token = await findGitHubAPIToken(reqBody);
	const user = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include: Workspace,
	});
	const octokit = new Octokit({
		auth: token,
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
				url: "https://gitgoingslackbot.uc.r.appspot.com/api/webhook",
				content_type: "json",
				insecure_ssl: "0",
			},
		});
	});
};

module.exports = gitHubSetRepoHook;
