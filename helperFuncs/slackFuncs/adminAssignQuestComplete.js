const { Achievement, Quest, User, Playerstat } = require("../../server/db/");
const userLevelFunc = require("../webhookFuncs/userLevelFunc");
const updateAchievement = require("../webhookFuncs/updateAchievement");

const adminAssignQuestComplete = async (reqBody) => {
	const {
		view: {
			state: {
				values: { questBlock, userSelectBlock },
			},
		},
	} = reqBody;

	const quests = questBlock.questAction.selected_options;
	const userId = userSelectBlock.userSelectAction.selected_user;
	const user = await User.findOne({
		where: {
			slackID: userId,
		},
		include: {
			model: Playerstat,
		},
	});

	if (user && quests.length) {
		const achievements = await Achievement.findAll();
		quests.forEach(async (quest) => {
			const questsCompleted =
				user.dataValues.playerstat.dataValues.questsCompleted + 1;
			const achievement = await updateAchievement(
				questsCompleted,
				"questsCompleted",
				achievements
			);
			user.addAchievement(achievement);
			const singleQuest = await Quest.findOne({
				where: {
					id: quest.value,
				},
			});
			Playerstat.update(
				{
					questsCompleted,
				},
				{
					where: {
						userId: user.dataValues.id,
					},
				}
			);
			userLevelFunc(
				user,
				singleQuest.dataValues.expValue,
				singleQuest.dataValues.goldValue
			);
			singleQuest.update({
				status: "completed",
			});
		});
	}
};

module.exports = adminAssignQuestComplete;
