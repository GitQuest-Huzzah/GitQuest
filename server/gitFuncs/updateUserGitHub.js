const { Users } = require("../db");

const updateUserGitHub = async (reqBody) => {
	const gitHubUser =
		reqBody.view.state.values.adminGitConnectUserModal.adminGitConnectUserAction
			.selected_option;
	const userSlackID =
		reqBody.view.state.values.adminGitConnectUserSlack.slackUserSelect
			.selected_user;
	const user = await Users.findOne({
		where: {
			slackID: userSlackID,
		},
	});
	user.update({
		gitHubID: gitHubUser.value,
		gitHubLogin: gitHubUser.text.text,
	});
};

module.exports = updateUserGitHub;
