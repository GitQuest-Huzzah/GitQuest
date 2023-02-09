const { WebClient } = require("@slack/web-api");
const { Users, Workspaces, Playerstat } = require("../../server/db");

//instantiating an instance of the slack Web Client API
const web = new WebClient();
//slackInstallAuth responds to the redirect from a user agreeing to install the app on a workspace, which hits the path /api/slack/install/redirect
// the first block takes the code given by agreeing to install, and supplies the associated slack app information and then exchanges it for a official bot token
const slackInstallAuth = async (req, res) => {
    try {
        const installRequest = await web.oauth.v2.access({
            code: req.query.code,
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
        });
        //adminUser block sets the installer of the app on a workspace as the admin for that workspace
        const checkExistingInstall = await Users.findOne({
            where: {
                slackID: installRequest.authed_user.id,
            },
        });
        if (checkExistingInstall) return false;
        const adminUser = await Users.create({
            email: req.query.state,
            slackID: installRequest.authed_user.id,
            isAdmin: true,
        });
        const stats = await Playerstat.create({});
        adminUser.setPlayerstat(stats);
        //on install this also creates an associated workspace for the newly installed app
        const newWorkspace = await Workspaces.create({
            botToken: installRequest.access_token,
            teamID: installRequest.team.id,
            teamName: installRequest.team.name,
        });
        //list all users in the workspace
        const result = await web.users.list({
            token: installRequest.access_token,
        });
        //filter out bots, the admin who was just created, and slackbot which is not labeled as a bot
        const filteredMembers = result.members.filter(
            (member) =>
                member["is_bot"] === false &&
                member["name"] !== "slackbot" &&
                member["id"] !== installRequest.authed_user.id
        );
        //we then create an entry for each user and set their workspace to the new workspace
        filteredMembers.forEach(async (user) => {
            const newUser = await Users.create({
                slackID: user["id"],
            });
            await newUser.setWorkspace(newWorkspace);
            const stats = await Playerstat.create({});
            newUser.setPlayerstat(stats);
        });
        await adminUser.setWorkspace(newWorkspace);
        return true;
    } catch (error) {
        console.error(error);
    }
};

module.exports = slackInstallAuth;
