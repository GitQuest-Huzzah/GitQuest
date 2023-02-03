const { Users } = require("../db");

const retrieveGitHubAPIToken = async (reqBody) => {
	const user = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		attributes: ["gitHubToken"],
	});
	return user.dataValues.gitHubToken;
};

module.exports = retrieveGitHubAPIToken;
