const { Octokit } = require("@octokit/core");
const { Repos } = require("../db");
const retrieveGitHubAPIToken = require("./retrieveGitHubAPIToken");
const gitHubDeleteRepo = async (reqBody) => {
	const reposToDelete =
		reqBody.view.state.values.adminDeleteRepoModal.adminDeleteRepoModalAction
			.selected_options;
	const token = await retrieveGitHubAPIToken(reqBody);
	const octokit = new Octokit({
		auth: token
	});
	reposToDelete.forEach(async (repo) => {
		const [repoId, orgName] = repo.value.split(",");
		const destroyedRepo = await Repos.destroy({
			where: {
				repoId: repoId,
			},
		});
		const {data} = await octokit.request("GET /repos/{owner}/{repo}/hooks", {
			owner: orgName,
			repo: repo.text.text,
		});
        await octokit.request("DELETE /repos/{owner}/{repo}/hooks/{hook_id}", {
			owner: orgName,
			repo: repo.text.text,
            hook_id: data[0].id
		});
       
	});
};

module.exports = gitHubDeleteRepo;
