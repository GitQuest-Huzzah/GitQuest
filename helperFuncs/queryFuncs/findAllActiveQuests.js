const { Quest, Workspace } = require("../../server/db");

const findAllActiveQuests = async (reqBody) => {
	const quests = await Quest.findAll({
		where: {
			status: "active",
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

module.exports = findAllActiveQuests;
