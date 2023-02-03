const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
//blockTest responds to the call of /block on the app, which hits the path /api/commands/block
const blockTest = async (reqBody, res) => {
	const token = await findTokenByTeamId(reqBody.user.team_id)
	await web.chat.postMessage({
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: "*Who's code is the least shit?* Poll by *Your Mom*",
				},
			},
			{
				type: "divider",
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: ":man: *Bobby B*\nHottest dude in Denver.",
				},
				accessory: {
					type: "button",
					text: {
						type: "plain_text",
						emoji: true,
						text: "Vote",
					},
					value: "click_me_123",
					action_id: "bob",
				},
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: ":cat: *Corbin Campbell*\nSuper pissed.",
				},
				accessory: {
					type: "button",
					text: {
						type: "plain_text",
						emoji: true,
						text: "Vote",
					},
					value: "click_me_123",
					action_id: "corbin",
				},
			},
			{
				type: "actions",
				elements: [
					{
						type: "button",
						text: {
							type: "plain_text",
							text: "Click Me",
							emoji: true,
						},
						value: "click_me_123",
						action_id: "actionId-0",
					},
				],
			},
		],
		channel: reqBody.channel_id,
		token: token
	});
};

module.exports = blockTest;
