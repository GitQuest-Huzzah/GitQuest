const { Workspace, User, Quest } = require("../../server/db");
const { DateTime } = require("luxon");
const { Sequelize } = require("sequelize");
const findQuestActivity = async (reqBody) => {
			try {
		const timeFrame =
			reqBody.view.state.values.questActivityOption.questActivitySelect
				.selected_option.value;
		const adminUser = await User.findOne({
			where: {
				slackID: reqBody.user.id, //this would be slackID in the real thing
			},
			include: {
				model: Workspace,
				include: {
					model: User,
				},
			},
		});
		const questsReturn = await Quest.findAll({
			where: {
				status: "completed",
			},
			include: [
				{
					model: Workspace,
					where: {
						id: adminUser.dataValues.workspaceId,
					},
				},
				{ model: User },
			],
			attributes: [
				"updatedAt",
				[Sequelize.literal('"user". "gitHubLogin"'), "gitHubLogin"],
			],
		});
		const now = DateTime.fromJSDate(new Date());
		const questsWithinTimePeriod = questsReturn.filter((quest) => {
			const questFinished = DateTime.fromISO(
				quest.dataValues.updatedAt.toISOString()
			);
			const timeSinceQuestComplete = now
				.diff(questFinished, "hours")
				.toObject();
			return timeSinceQuestComplete.hours < timeFrame;
		});
		const questStats = questsWithinTimePeriod
			.map((quest) => quest.dataValues.gitHubLogin)
			.reduce((acc, name) => {
				acc[name] = (acc[name] || 0) + 1;
				return acc;
			}, {});
		const finalStats = Object.entries(questStats).map((stat) => {
			return { name: stat[0], questQuantity: stat[1] };
		});
		return finalStats;
	} catch (error) {
		console.error(error);
	}
};

module.exports = findQuestActivity;
