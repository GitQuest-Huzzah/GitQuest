const { WebClient } = require("@slack/web-api");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const adminOrgModal = async (reqBody) => {
	await web.views.open({
		trigger_id: reqBody.trigger_id,
		token: "***REMOVED***",
		view: {
			external_id: "adminAddOrgSubmit",
			type: "modal",
			title: {
				type: "plain_text",
				text: "Add Org",
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
					type: "input",
					block_id: "OwnerName",
					element: {
						type: "plain_text_input",
						action_id: "Owner_Input",
					},
					label: {
						type: "plain_text",
						text: "Owner or Org",
						emoji: true,
					},
				},
			],
		},
	});
};

module.exports = adminOrgModal;
