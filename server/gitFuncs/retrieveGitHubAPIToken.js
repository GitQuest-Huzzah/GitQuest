const { Users } = require("../db");

const retrieveGitHubAPIToken = async (reqBody) => {
	const {dataValues} = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		attributes: ["gitHubToken"],
	});
	return dataValues.gitHubToken;
};

module.exports = retrieveGitHubAPIToken;
