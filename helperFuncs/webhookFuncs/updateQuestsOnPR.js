const { Achievement, Quest, User, Playerstat, Workspace } = require("../../server/db");
const userLevelFunc = require("../webhookFuncs/userLevelFunc");
const updateAchievement = require("./updateAchievement");
const updateQuestsOnPR = async (reqBody) => {
	console.log("req from update quest pr", reqBody, "req from update quest PR")
	const userWorkspace = await Workspace.findOne({
		where: {
			orgName: reqBody.organization
				? reqBody.organization.login
				: reqBody.repository.owner.login,
		}, 
	})
	const quest = await Quest.findOne({
		where: {
			pullRequestID: reqBody.pull_request.id,
		},
	});
	const user = await User.findOne({
		where: {
			gitHubID: reqBody.pull_request.user.id.toString(),
			workspaceId: userWorkspace.dataValues.id
		},
		include: {
			model: Playerstat,
		},
	});
	console.log(user, "update quest on PR user")
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
