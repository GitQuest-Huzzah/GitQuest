const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
const createAdminGHLink = require("./createAdminGHLink");
const { Users } = require("../db");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
// Listen to the app_home_opened Events API event to hear when a user opens your app from the sidebar
const homeTab = async (reqBody) => {
    const token = await findTokenByTeamId(reqBody.team_id);
    const user = await Users.findOne({
        where: {
            slackID: reqBody.event.user,
        },
    });
    const gHLink = createAdminGHLink({
        teamId: reqBody.team_id,
        userId: reqBody.event.user,
    });
    try {
        // Call the views.publish method using the WebClient passed to listeners
        await web.views.publish({
            user_id: reqBody.event.user,
            token: token,
            view: {
                // Home tabs must be enabled in your app configuration page under "App Home"
                type: "home",
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: `Hey there Git Quest **Your Rank and Name Here**`,
                        },
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "Add or Update Org Name",
                                    emoji: true,
                                },
                                value: "Add or Update Org Name",
                                action_id: "adminOrgModalButton",
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "Link Org To GitHub",
                                    emoji: true,
                                },
                                value: "Link Org To GitHub",
                                url: gHLink,
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "Repos to connect",
                                    emoji: true,
                                },
                                value: "Repos to connect",
                                action_id: "adminRepoModalButton",
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "Repos to Delete",
                                    emoji: true,
                                },
                                value: "Repos to Delete",
                                action_id: "adminRepoDeleteModalButton",
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "Link Users To GitHub",
                                    emoji: true,
                                },
                                value: "Connect User To GitHub Account",
                                action_id: "adminGitConnectUserModalButton",
                            },
                        ],
                    },
                    {
                        type: "header",
                        text: {
                            type: "plain_text",
                            text: "Welcome Hero!",
                        },
                    },
                    {
                        type: "divider",
                    },
                    {
                        type: "section",
                        fields: [
                            {
                                type: "mrkdwn",
                                text: `*User Profile*\n*Level*: ${user.dataValues.level}\n*Title*:${user.dataValues.title} \n *Total Exp*: ${user.dataValues.exp}\n*Gold*: ${user.dataValues.gold} \n *Gold to Give*: ${user.dataValues.rewardGold}`,
                            },
                        ],
                    },
                    {
                        type: "divider",
                    },
                    {
                        type: "actions",
                        elements: [
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "Give Gold to Give",
                                    emoji: true,
                                },
                                action_id: "giveGoldButton",
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "Gold Log",
                                    emoji: true,
                                },
                                action_id: "goldLogButton",
                            },
                            {
                                type: "button",
                                text: {
                                    type: "plain_text",
                                    text: "Achievements",
                                    emoji: true,
                                },
                                action_id: "achievementsButton",
                            },
                        ],
                    },
                ],
            },
        });
    } catch (error) {
        console.error(error);
    }
};

module.exports = homeTab;
