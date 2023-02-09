const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId } = require("../../helperFuncs");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const { questDisplay } = require("../../helperFuncs");
const { findAllActiveQuests } = require("../../helperFuncs");

const adminAssignQuestCompleteModal = async (reqBody) => {
	const quests = await findAllActiveQuests(reqBody);

	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: await findTokenByTeamId(reqBody.user.team_id),
		view: {
			type: "modal",
			callback_id: "assignQuestCompleteSubmit",
			title: {
				type: "plain_text",
				text: "Available Quests",
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
			blocks: questDisplay(quests),
		},
	});
};

module.exports = adminAssignQuestCompleteModal;
