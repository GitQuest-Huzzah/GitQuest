const { Octokit } = require("@octokit/core");
const { Repo } = require("../../server/db");
const findGitHubAPIToken = require("../queryFuncs/findGitHubAPIToken");
const gitHubDeleteRepo = async (reqBody) => {
	const reposToDelete =
		reqBody.view.state.values.adminDeleteRepoModal.adminDeleteRepoModalAction
			.selected_options;
	const token = await findGitHubAPIToken(reqBody);
	const octokit = new Octokit({
		auth: token,
	});
	reposToDelete.forEach(async (repo) => {
		const [repoId, orgName] = repo.value.split(",");
		await Repo.destroy({
			where: {
				repoId: repoId,
			},
		});
		const { data } = await octokit.request("GET /repos/{owner}/{repo}/hooks", {
			owner: orgName,
			repo: repo.text.text,
		});
		await octokit.request("DELETE /repos/{owner}/{repo}/hooks/{hook_id}", {
			owner: orgName,
			repo: repo.text.text,
			hook_id: data[0].id,
		});
	});
};

module.exports = gitHubDeleteRepo;
