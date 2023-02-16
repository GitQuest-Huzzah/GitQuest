const { User, Playerstat, Workspace } = require("../../server/db");

const updateUserGitHub = async (reqBody) => {
	const gitHubUser =
		reqBody.view.state.values.adminGitConnectUserModal.adminGitConnectUserAction
			.selected_option;
	const userSlackID =
		reqBody.view.state.values.adminGitConnectUserSlack.slackUserSelect
			.selected_user;
	const [user, created] = await User.findOrCreate({
		where: {
			slackID: userSlackID,
		},
	});

    if(created){
        const workspace = await Workspace.findOne({
            slackID: reqBody.team.id
        }) 
        const playerstat = await Playerstat.create()
        console.log(user)
        user.setWorkspace(workspace)
        user.setPlayerstat(playerstat)
    }


	user.update({
		gitHubID: gitHubUser.value,
		gitHubLogin: gitHubUser.text.text,
	});
};

module.exports = updateUserGitHub;
