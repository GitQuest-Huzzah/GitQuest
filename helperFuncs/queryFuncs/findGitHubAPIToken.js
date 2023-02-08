const { Users } = require("../../server/db");

const findGitHubAPIToken = async (reqBody) => {
	const {dataValues} = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		attributes: ["gitHubToken"],
	});
	return dataValues.gitHubToken;
};

module.exports = findGitHubAPIToken;
