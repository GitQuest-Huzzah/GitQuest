const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const adminGitConnectUserModal = async (reqBody) => {
	const token = await findTokenByTeamId(reqBody.user.team_id)
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: token, 
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