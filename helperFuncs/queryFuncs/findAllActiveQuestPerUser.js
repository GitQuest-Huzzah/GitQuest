const { Quest, Workspace, Users } = require("../../server/db");
const findAllActiveQuestsPerUser = async (reqBody) => {
	const user = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
	});

	const quests = await Quest.findAll({
		where: {
			status: "active",
			userId: user.id,
		},
		include: {
			model: Workspace,
			where: {
				teamID: reqBody.user.team_id,
			},
		},
	});
	return quests;
};

module.exports = findAllActiveQuestsPerUser;
