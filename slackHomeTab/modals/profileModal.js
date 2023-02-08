const { WebClient } = require("@slack/web-api");
const { Users } = require("../../server/db");
const { findTokenByTeamId } = require("../../apiFuncs/slackFuncs");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const profileModal = async (reqBody) => {
	const token = await findTokenByTeamId(reqBody.user.team_id);
	const user = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
	});
	const renderQuery = {
		component: "profile",
		user: user.gitHubLogin,
		gold: user.gold,
		xp: user.exp,
		rank: user.title,
	};
	const stringQuery = JSON.stringify(renderQuery);
	const baseQuery = Buffer.from(stringQuery).toString("base64");
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: token,
		view: {
			type: "modal",
			title: {
				type: "plain_text",
				text: "Player Profile",
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
					image_url: `http://${process.env.PRERENDER_URL}/render?width=600&height=600&renderType=jpeg&url=https://${process.env.FRONTEND_PRERENDER}?${baseQuery}`,
					alt_text: "inspiration",
				},
			],
		},
	});
};

module.exports = profileModal;
