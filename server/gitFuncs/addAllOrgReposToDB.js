const { Workspaces, Repos } = require("../db/");

const addAllOrgReposToDB = async (reqBody) => {
	const workspace = await Workspaces.findOne({
		where: {
			teamID: reqBody.view.team_id,
		},
	});
	const reposToAdd =
		reqBody.view.state.values.adminRepoModal.adminRepoModalAction
			.selected_options;
	reposToAdd.forEach(async (repo) => {
		const singleRepo = await Repos.create({
			repoId: repo.value,
			repoName: repo.text.text,
		});
		singleRepo.setWorkspace(workspace);
	});
};

module.exports = addAllOrgReposToDB;
