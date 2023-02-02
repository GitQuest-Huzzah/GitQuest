const { WebClient } = require("@slack/web-api");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
// Listen to the app_home_opened Events API event to hear when a user opens your app from the sidebar
const homeTab = async (reqBody) => {
	try {
		// Call the views.publish method using the WebClient passed to listeners
		const result = await web.views.publish({
			user_id: reqBody.event.user,
			token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
			view: {
				// Home tabs must be enabled in your app configuration page under "App Home"
				type: "home",
				blocks: [
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: "Hey there big boy",
						},
					},
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: "Learn how home tabs can be more useful and interactive <https://api.slack.com/surfaces/tabs/using|*in the documentation*>.",
						},
					},
					{
						type: "divider",
					},
					{
						type: "context",
						elements: [
							{
								type: "mrkdwn",
								text: "Psssst this home tab was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>",
							},
						],
					},
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: "This is a section block with a button.",
						},
						accessory: {
							type: "button",
							text: {
								type: "plain_text",
								text: "Add or Update Org Name",
								emoji: true,
							},
							value: "Add or Update Org Name",
							action_id: "adminOrgModalButton",
						},
					},
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: "This is a section block with a button.",
						},
						accessory: {
							type: "button",
							text: {
								type: "plain_text",
								text: "Repos to connect",
								emoji: true,
							},
							value: "Repos to connect",
							action_id: "adminRepoModalButton",
						},
					},
				],
			},
		});

		// console.log(result);
	} catch (error) {
		console.error(error);
	}
};

module.exports = homeTab;