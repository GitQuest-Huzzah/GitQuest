const { WebClient } = require("@slack/web-api");
const { findTokenByTeamId } = require("../../helperFuncs");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const adminDeleteRepoModal = async (reqBody) => {
	const token = await findTokenByTeamId(reqBody.user.team_id);
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: token,
		view: {
			type: "modal",
			callback_id: "adminDeleteReposSubmit",
			title: {
				type: "plain_text",
				text: "Remove Watched Repo",
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
					block_id: "adminDeleteRepoModal",
					text: {
						type: "mrkdwn",
						text: "*Select Repos to Stop Tracking*",
					},
					accessory: {
						action_id: "adminDeleteRepoModalAction",
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

module.exports = adminDeleteRepoModal;
