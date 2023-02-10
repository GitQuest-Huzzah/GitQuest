const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId } = require("../../helperFuncs");
const { User, Goldlog } = require("../../server/db");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const goldLogModal = async (reqBody) => {
	const goldLogs = await Goldlog.findAll({
		include: {
			model: User,
			where: {
				slackID: reqBody.user.id,
			},
		},
	});
	const token = await findTokenByTeamId(reqBody.user.team_id);
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: token,
		view: {
			callback_id: "goldLogModal",
			type: "modal",
			title: {
				type: "plain_text",
				text: "Gold Log",
				emoji: true,
			},
			close: {
				type: "plain_text",
				text: "Close",
				emoji: true,
			},
			blocks: goldLogs.length
				? goldLogs.map((log) => {
						return {
							type: "section",
							text: {
								type: "mrkdwn",
								text: `${log.dataValues.description} ${log.dataValues.valueChange}`,
							},
						};
				  })
				: [
						{
							type: "section",
							text: {
								type: "mrkdwn",
								text: `You don't have a gold log!`,
							},
						},
				  ],
		},
	});
};

module.exports = goldLogModal;
