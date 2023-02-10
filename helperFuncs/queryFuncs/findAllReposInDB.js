const { Repo, Users, Workspace } = require("../../server/db");

const findAllReposInDB = async (reqBody) => {
	return await Users.findOne({
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
