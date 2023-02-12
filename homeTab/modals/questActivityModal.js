const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId } = require("../../helperFuncs");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const questActivityModal = async (reqBody) => {
	const token = await findTokenByTeamId(reqBody.user.team_id);
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: token,
		view: {
			type: "modal",
			callback_id: "questActivityGraphSubmit",
			title: {
				type: "plain_text",
				text: "Quest Activity",
				emoji: true,
			},
			submit: {
				type: "plain_text",
				text: "Submit",
				emoji: true,
			},
			close: {
				type: "plain_text",
				text: "Close",
				emoji: true,
			},
			blocks: [
				{
					type: "section",
					block_id:'questActivityOption',
					text: {
						type: "mrkdwn",
						text: "Activity Time Frame",
					},
					accessory: {
						type: "static_select",
						placeholder: {
							type: "plain_text",
							text: "Select Time",
							emoji: true,
						},
						options: [
							{
								text: {
									type: "plain_text",
									text: "12hrs",
									emoji: true,
								},
								value: "12",
							},
							{
								text: {
									type: "plain_text",
									text: "1 Day",
									emoji: true,
								},
								value: "24",
							},
							{
								text: {
									type: "plain_text",
									text: "2 Days",
									emoji: true,
								},
								value: "48",
							},
							{
								text: {
									type: "plain_text",
									text: "3 Days",
									emoji: true,
								},
								value: "72",
							},
							{
								text: {
									type: "plain_text",
									text: "4 Days",
									emoji: true,
								},
								value: "96",
							},
							{
								text: {
									type: "plain_text",
									text: "5 Days",
									emoji: true,
								},
								value: "120",
							},
							{
								text: {
									type: "plain_text",
									text: "6 Days",
									emoji: true,
								},
								value: "144",
							},
							{
								text: {
									type: "plain_text",
									text: "7 Days",
									emoji: true,
								},
								value: "168",
							},
						],
						action_id: "questActivitySelect",
					},
				},
			],
		},
	});
};

module.exports = questActivityModal;
