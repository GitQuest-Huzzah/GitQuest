const { WebClient } = require("@slack/web-api");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const adminRepoModal = async (reqBody) => {
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: "***REMOVED***",
		view: {
			type: "modal",
            external_id: 'adminAddReposSubmit',
			title: {
				type: "plain_text",
				text: "Adding Repo to Watch",
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
					block_id: "adminRepoModal",
					text: {
						type: "mrkdwn",
						text: "Pick items from the list",
					},
					accessory: {
						action_id: "adminRepoModalAction",
						type: "multi_external_select",
						placeholder: {
							type: "plain_text",
							text: "Select items",
						},
						min_query_length: 0,
					},
				},
			],
		},
	});
};

module.exports = adminRepoModal