const { Quest, Users, Playerstat } = require("../../server/db");
const userLevelFunc = require('../webhookFuncs/userLevelFunc')
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
        include:{
            model: Playerstat
        }
	});

	if (quest) {
		quest.update({
			status: "completed",
		});
        userLevelFunc(user, quest.dataValues.expValue, quest.dataValues.goldValue)
	}
};

module.exports = updateQuestsOnPR;
