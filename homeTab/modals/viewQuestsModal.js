const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId } = require("../../helperFuncs");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const { questDisplay, findAllAvailableQuests } = require("../../helperFuncs");
const viewQuestsModal = async (reqBody) => {
	const quests = await findAllAvailableQuests(reqBody);

	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: await findTokenByTeamId(reqBody.user.team_id),
		view: {
			type: "modal",
			callback_id: "viewQuestsSubmit",
			title: {
				type: "plain_text",
				text: "View Quests",
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
			blocks: questDisplay(quests, "available"),
		},
	});
};

module.exports = viewQuestsModal;
