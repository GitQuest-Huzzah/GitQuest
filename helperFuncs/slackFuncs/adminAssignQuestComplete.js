const { Quest, Users, Playerstat } = require("../../server/db/");
const  userLevelFunc  = require("../webhookFuncs/userLevelFunc")

const adminAssignQuestComplete = async (reqBody) => {
	const quests =
		reqBody.view.state.values.questBlock.questAction.selected_options;
	const userId =
		reqBody.view.state.values.userSelectBlock.userSelectAction.selected_user;
	const user = await Users.findOne({
		where: {
			slackID: userId,
		},
        include:{
            model: Playerstat
        }
	});

	if (user && quests.length) {
		quests.forEach(async (quest) => {
			const singleQuest = await Quest.findOne({
				where: {
					id: quest.value,
				},
			});
            userLevelFunc(user, singleQuest.dataValues.expValue, singleQuest.dataValues.goldValue)
			singleQuest.update({
				status: "completed",
			});
		});
	}
};

module.exports = adminAssignQuestComplete;
