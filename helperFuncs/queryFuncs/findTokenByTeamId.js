const { Workspace } = require("../../server/db");

//finding bot token that belongs to a workspace to send response to proper instance of bot
const findTokenByTeamId = (teamId) =>
	Workspace.findOne({
		where: {
			teamID: teamId,
		},
	}).then(token=>token.dataValues.botToken).catch(console.error);

module.exports = findTokenByTeamId;
