const { Workspaces, Repos } = require("../db");

const findAllWorkSpaceRepos = async (team_id) => {
	return await Workspaces.findOne({
		where: {
			teamID: team_id,
		},
		include: {
			model: Repos,
		},
	});
};

module.exports = findAllWorkSpaceRepos;
