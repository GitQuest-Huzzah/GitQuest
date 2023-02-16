const { Quest, User, Workspace } = require("../../server/db");

const addPRIDToQuest = async (reqBody) => {
	const userWorkspace = await Workspace.findOne({
		where: {
			orgName: reqBody.organization
				? reqBody.organization.login
				: reqBody.repository.owner.login,
		}, 
	})
	const user = await User.findOne({
		where: {
			gitHubID: reqBody.sender.id.toString(),
			workspaceId: userWorkspace.dataValues.id
		},
		include: {
			model: Workspace,
			where: {
				orgName: reqBody.organization ? reqBody.organization.login :  reqBody.repository.owner.login,
			},
		},
	});

	const quests = await Quest.findAll({
		where: {
			userId: user.id,
			status: "active"
		},
	});
	if (quests.length) {
		const prQuest = quests.reduce((acc, quest) => {
			if (reqBody.pull_request.title.toLowerCase().split(" ")[0] === quest.keyword.toLowerCase()) {
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
