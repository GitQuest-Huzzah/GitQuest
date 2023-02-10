const { Workspace, Repo } = require("../../server/db");

const findAllWorkSpaceRepos = async (team_id) => {
	return await Workspace.findOne({
		where: {
			teamID: team_id,
		},
		include: {
			model: Repo,
		},
	});
};

module.exports = findAllWorkSpaceRepos;
