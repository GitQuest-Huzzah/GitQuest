const { WebClient } = require("@slack/web-api");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const adminGitConnectUserModal = async (reqBody) => {
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: "xoxb-4706667577361-4696519498212-BS2W96yuJQEyIf29kY6baP4i",
		view: {
			type: "modal",
            external_id: 'adminGitConnectUserSubmit',
			title: {
				type: "plain_text",
				text: "Link User to GitHub",
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
                    "type": "section",
                    "block_id": "adminGitConnectUserSlack",
                    "text": {
                      "type": "mrkdwn",
                      "text": "Slack User"
                    },
                    "accessory": {
                      "action_id": "slackUserSelect",
                      "type": "users_select",
                      "placeholder": {
                        "type": "plain_text",
                        "text": "Select a Slack User"
                      }
                    }
                  },
				{
					type: "section",
					block_id: "adminGitConnectUserModal",
					text: {
						type: "mrkdwn",
						text: "GitHub Account",
					},
					accessory: {
						action_id: "adminGitConnectUserAction",
						type: "external_select",
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

module.exports = adminGitConnectUserModal;