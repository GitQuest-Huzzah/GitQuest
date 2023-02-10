const { Quest, User } = require("../../server/db");
const viewQuests = async (reqBody) => {
	const selectedQuests =
		reqBody.view.state.values.questBlock.questAction.selected_options;

	const user = await User.findOne({
		where: {
			slackID: reqBody.user.id,
		},
	});

	selectedQuests.forEach(async (quest) => {
		singleQuest = await Quest.findOne({
			where: {
				id: quest.value,
			},
		});
		user.addQuest(singleQuest);
		await singleQuest.update({
			status: "active",
		});
	});
};

module.exports = viewQuests;
