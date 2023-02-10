const { Repo, User, Workspace } = require("../../server/db");

const findAllReposInDB = async (reqBody) => {
	return await User.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include: {
			model: Workspace,
			include: {
				model: Repo,
			},
		},
	});
};

module.exports = findAllReposInDB;
