const { Achievement, Quest, User, Playerstat } = require("../../server/db");
const userLevelFunc = require("../webhookFuncs/userLevelFunc");
const updateAchievement = require("./updateAchievement");
const updateQuestsOnPR = async (reqBody) => {
	const quest = await Quest.findOne({
		where: {
			pullRequestID: reqBody.pull_request.id,
		},
	});

	const user = await User.findOne({
		where: {
			gitHubID: reqBody.pull_request.user.id.toString(),
		},
		include: {
			model: Playerstat,
		},
	});

	if (quest) {
		const achievements = await Achievement.findAll();
		const questsCompleted =
			user.dataValues.playerstat.dataValues.questsCompleted + 1;
		const achievement = updateAchievement(
			questsCompleted,
			"questsCompleted",
			achievements
		);
		Playerstat.increment("questsCompleted", {
			 where:{
				userId: user.dataValues.id
			}
		});
		user.addAchievement(achievement);
		quest.update({
			status: "completed",
		});
		userLevelFunc(user, quest.dataValues.expValue, quest.dataValues.goldValue);
	}
};

module.exports = updateQuestsOnPR;
