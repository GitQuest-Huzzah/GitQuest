const { WebClient } = require("@slack/web-api");
const createAdminGHLink = require("./createAdminGHLink");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
// Listen to the app_home_opened Events API event to hear when a user opens your app from the sidebar
const homeTab = async (reqBody) => {
	const gHLink = createAdminGHLink(reqBody)
	try{
		// Call the views.publish method using the WebClient passed to listeners
		await web.views.publish({
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
							text: "FIRST WE NEED YOUR ORGANIZATION NAME",
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
							text: "THEN WE NEED YOU TO CONNECT YOUR ORG TO GITHUB",
						},
						accessory: {
							type: "button",
							text: {
								type: "plain_text",
								text: "Link Org To GitHub",
								emoji: true,
							},
							value: "Link Org To GitHub",
							url: gHLink
						},
					},
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: "THEN TELL US WHAT REPOS TO WATCH FOR YOU",
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
							text: "THEN LINK YOUR USERS TO THEIR GITHUB USERNAME",
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
							text: "IF YOU NEED US TO STOP WATCHING A REPO FOR YOU",
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