const { Quest, User, Workspaces } = require("../../server/db");

const addPRIDToQuest = async (reqBody) => {
	const user = await User.findOne({
		where: {
			gitHubID: reqBody.sender.id.toString(),
		},
		include: {
			model: Workspace,
			where: {
				orgName: reqBody.organization.login,
			},
		},
	});

	const quests = await Quest.findAll({
		where: {
			userId: user.id,
		},
	});
	if (quests.length) {
		const prQuest = quests.reduce((acc, quest) => {
			if (reqBody.pull_request.title.split(" ")[0] === quest.keyword) {
				acc = quest;
			}
			return acc;
		});

		if (prQuest) {
			prQuest.update({
				pullRequestID: reqBody.pull_request.id,
			});
		}
	}
};

module.exports = addPRIDToQuest;
