const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId } = require("../../helperFuncs");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const {
	questDisplay,
	findAllActiveQuestsPerUser,
} = require("../../helperFuncs");

const questLogModal = async (reqBody) => {
	const quests = await findAllActiveQuestsPerUser(reqBody);

	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: await findTokenByTeamId(reqBody.user.team_id),
		view: {
			type: "modal",
			callback_id: "questLogSubmit",
			title: {
				type: "plain_text",
				text: "Your Active Quests",
				emoji: true,
			},
			submit: {
				type: "plain_text",
				text: "Submit",
				emoji: true,
			},
			close: {
				type: "plain_text",
				text: "Cancel",
				emoji: true,
			},
			blocks: questDisplay(quests, "active"),
		},
	});
};

module.exports = questLogModal;
