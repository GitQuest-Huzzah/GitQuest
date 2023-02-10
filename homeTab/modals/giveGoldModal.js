const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId } = require("../../helperFuncs");
const { Playerstat, User } = require("../../server/db");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const giveGoldModal = async (reqBody) => {
	const token = await findTokenByTeamId(reqBody.user.team_id);
	const {
		dataValues: {
			playerstat: {
				dataValues: { rewardGold },
			},
		},
	} = await User.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include: {
			model: Playerstat,
		},
	});
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: token,
		view: {
			type: "modal",
			callback_id: "giveGoldSubmit",
			title: {
				type: "plain_text",
				text: "Reward a Teammate!",
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
			blocks: [
				{
					type: "section",
					block_id: "userSelected",
					text: {
						type: "mrkdwn",
						text: "Who ye givin' yer gold to?",
					},
					accessory: {
						type: "users_select",
						placeholder: {
							type: "plain_text",
							text: "Select a user",
							emoji: true,
						},
						action_id: "selectedUser",
					},
				},
				{
					type: "input",
					block_id: "amountGiven",
					element: {
						type: "number_input",
						is_decimal_allowed: false,
						action_id: "givenAmount",
					},
					label: {
						type: "plain_text",
						text: `Reward Amount (Available:${rewardGold}) `,
						emoji: true,
					},
				},
			],
		},
	});
};

module.exports = giveGoldModal;
