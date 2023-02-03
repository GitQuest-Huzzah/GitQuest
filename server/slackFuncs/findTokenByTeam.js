const { Workspaces } = require("../db");

//finding bot token that belongs to a workspace to send response to proper instance of bot
const findTokenByTeamId = async (teamId) => {
	try {
		const token = await Workspaces.findOne({
			where: {
				teamID: teamId,
			},
		});
		console.log(token, "token in find token")
		return token.dataValues.gitHubToken;
	} catch (error) {
		console.error(error);
	}
};

module.exports = findTokenByTeamId;
