const { Workspaces, Repos } = require("../../server/db");

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
