const Quest = require("../../server/db");

const questLog = (reqBody) => {
	const quests =
		reqBody.view.state.values.questBlock.questAction.selected_options;

	quests.forEach(async (quest) => {
		singleQuest = await Quest.findOne({
			where: {
				id: quest.value,
			},
		});
		singleQuest.update({
			status: "available",
		});
	});
};
module.exports = questLog;
