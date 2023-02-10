const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId } = require("../../helperFuncs");
const { User, Achievement } = require("../../server/db");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const achievementsModal = async (reqBody) => {
	const {
		dataValues: { achievements },
	} = await User.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include: {
			model: Achievement,
		},
	});

	const token = await findTokenByTeamId(reqBody.user.team_id);
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: token,
		view: {
			callback_id: "achievementsModal",
			type: "modal",
			title: {
				type: "plain_text",
				text: "Achievements",
				emoji: true,
			},
			close: {
				type: "plain_text",
				text: "Close",
				emoji: true,
			},
			blocks: achievements
				? achievements.map((achievement) => {
						console.log(achievement);
						return {
							type: "section",
							text: {
								type: "mrkdwn",
								text: `${achievement.dataValues.description}`,
							},
						};
				  })
				: [
						{
							type: "section",
							text: {
								type: "mrkdwn",
								text: `You don't have any achievements!`,
							},
						},
				  ],
		},
	});
};

module.exports = achievementsModal;
