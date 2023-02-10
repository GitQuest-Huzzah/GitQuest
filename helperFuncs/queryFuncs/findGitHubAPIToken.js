const { User } = require("../../server/db");

const findGitHubAPIToken = async (reqBody) => {
	const { dataValues } = await User.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		attributes: ["gitHubToken"],
	});
	return dataValues.gitHubToken;
};

module.exports = findGitHubAPIToken;
