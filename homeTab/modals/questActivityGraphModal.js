const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId, findQuestActivity } = require("../../helperFuncs");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const questActivityGraphModal = async (reqBody) => {
	const timeFrame =
		reqBody.view.state.values.questActivityOption.questActivitySelect
			.selected_option.text.text;
	const token = await findTokenByTeamId(reqBody.user.team_id);
	const questStats = await findQuestActivity(reqBody);
	const stringQuery = JSON.stringify({
		component: "questActivity",
		activityStats: [...questStats],
	});
	const baseQuery = Buffer.from(stringQuery).toString("base64");
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: token,
		view: {
			type: "modal",
			title: {
				type: "plain_text",
				text: `${timeFrame} of Quests`,
				emoji: true,
			},
			close: {
				type: "plain_text",
				text: "Close",
				emoji: true,
			},
			blocks: [
				questStats.length
					? {
							type: "image",
							image_url: `http://${process.env.PRERENDER_URL}/render?width=370&height=440&renderType=jpeg&url=https://${process.env.FRONTEND_PRERENDER}?${baseQuery}`,
							alt_text: "quest stats",
					  }
					: {
							type: "header",
							text: {
								type: "plain_text",
								emoji: true,
								text: ":astonished: No Quest Activity Found! :astonished:",
							},
					  },
			],
		},
	});
};

module.exports = questActivityGraphModal;
