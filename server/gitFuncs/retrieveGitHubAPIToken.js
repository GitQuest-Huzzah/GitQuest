const { Users } = require("../db");

const retrieveGitHubAPIToken = async (reqBody) => {
	const {dataValues} = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		attributes: ["gitHubToken"],
	});
	console.log(dataValues.gitHubToken, "token")
	return dataValues.gitHubToken;
};

module.exports = retrieveGitHubAPIToken;
