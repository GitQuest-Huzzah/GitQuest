const { WebClient } = require("@slack/web-api");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
// Listen to the app_home_opened Events API event to hear when a user opens your app from the sidebar
const homeTab = async (reqBody) => {
	try {
		// Call the views.publish method using the WebClient passed to listeners
		 await web.views.publish({
			user_id: reqBody.event.user,
			token: "***REMOVED***",
			view: {
				// Home tabs must be enabled in your app configuration page under "App Home"
				type: "home",
				blocks: [
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: "Hey there Git Quest **Your Rank and Name Here**",
						},
					},
					{
						type: "divider",
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
								text: "Repos to Delete",
								emoji: true,
							},
							value: "Repos to Delete",
							action_id: "adminRepoDeleteModalButton",
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
								text: "Link Users To GitHub",
								emoji: true,
							},
							value: "Connect User To GitHub Account",
							action_id: "adminGitConnectUserModalButton",
						},
					},
				],
			},
		});
	} catch (error) {
		console.error(error);
	}
};

module.exports = homeTab;