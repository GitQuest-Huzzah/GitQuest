const { Repos, User, Workspaces } = require("../../server/db");

const findAllReposInDB = async (reqBody) => {
	return await User.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include: {
			model: Workspaces,
			include: {
				model: Repos,
			},
		},
	});
};

module.exports = findAllReposInDB;
