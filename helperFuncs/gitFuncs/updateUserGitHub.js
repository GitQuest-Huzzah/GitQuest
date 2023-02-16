const { User, Playerstat, Workspace } = require("../../server/db");

const updateUserGitHub = async (reqBody) => {
    const gitHubUser =
        reqBody.view.state.values.adminGitConnectUserModal
            .adminGitConnectUserAction.selected_option;
    const userSlackID =
        reqBody.view.state.values.adminGitConnectUserSlack.slackUserSelect
            .selected_user;
    const workspace = await Workspace.findOne({
        where: {
            teamID: reqBody.user.team_id,
        },
    });
    const [user, created] = await User.findOrCreate({
        where: {
            slackID: userSlackID,
            workspaceId: workspace.dataValues.id,
        },
    });
    if (created) {
        const playerstat = await Playerstat.create();
        user.setWorkspace(workspace);
        user.setPlayerstat(playerstat);
    }

    user.update({
        gitHubID: gitHubUser.value,
        gitHubLogin: gitHubUser.text.text,
    });
};

module.exports = updateUserGitHub;
