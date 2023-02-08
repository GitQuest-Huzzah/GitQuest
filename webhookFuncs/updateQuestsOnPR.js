const { GoldLog, Quest, Users } = require("../server/db");

const updateQuestsOnPR = async (reqBody) => {
	const quest = await Quest.findOne({
		where: {
			pullRequestID: reqBody.pull_request.id,
		},
	});

	const user = await Users.findOne({
		where: {
			gitHubID: reqBody.pull_request.user.id.toString(),
		},
	});

	if (quest) {
		const goldLog = await GoldLog.create({
			description: `You gained ${quest.dataValues.goldValue} gold from a quest!`,
			valueChange: `+ ${quest.dataValues.goldValue}`,
		});
		quest.update({
			status: "completed",
		});
		user.increment("exp", {
			by: quest.dataValues.expValue,
		});
		user.increment("gold", {
			by: quest.dataValues.goldValue,
		});
		user.addGoldlog(goldLog);
	}
};

module.exports = updateQuestsOnPR;
