const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId, findQuestActivity } = require("../../helperFuncs");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const questActivityModal = async (reqBody) => {
	const token = await findTokenByTeamId(reqBody.user.team_id);
	const questStats = await findQuestActivity(reqBody);
	const stringQuery = JSON.stringify({
		component: "questActivity",
		activityStats:{...questStats}
	});
	const baseQuery = Buffer.from(stringQuery).toString("base64");
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: token,
		view: {
			type: "modal",
			title: {
				type: "plain_text",
				text: "Quest Activity",
				emoji: true,
			},
			close: {
				type: "plain_text",
				text: "Close",
				emoji: true,
			},
			blocks: [
				{
					type: "image",
					image_url: `http://${process.env.PRERENDER_URL}/render?width=410&height=490&renderType=jpeg&url=https://${process.env.FRONTEND_PRERENDER}?${baseQuery}`,
					alt_text: "quest stats",
				},
			],
		},
	});
};

module.exports = questActivityModal;
