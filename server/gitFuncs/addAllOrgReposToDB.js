const { Workspaces, Repos } = require("../db");

const addAllOrgReposToDB = async (orgRepos, reqBody) => {
	const workspace = await Workspaces.findOne({
		where: {
			teamID: reqBody.team.id,
		},
	});
	orgRepos.data.forEach(async (repo) => {
		const singleRepo = await Repos.create({
			repoId: repo.id,
			repoName: repo.name,
		});
		singleRepo.setWorkspace(workspace);
	});
};

module.exports = addAllOrgReposToDB;
