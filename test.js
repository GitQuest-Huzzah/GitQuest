const Users = require("../db/module/Users");
const createAdminGHLink = require('./createAdminGHLink')
const adminHomeView = async (reqBody) => {
    const user = await Users.findOne({
        where: {
            slackID: reqBody.event.user,
        },
    });
    const gHLink = createAdminGHLink({
        teamId: reqBody.team_id,
        userId: reqBody.event.user,
    });
    return [
        {
            type: "image",
            image_url: `https://storage.googleapis.com/slackphotos/gqbanner.png`,
            alt_text: "Git Quest Banner",
        },
        {
            type: "actions",
            elements: [
                {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Add Quest",
                        emoji: true,
                    },
                    action_id: "addQuestButton",
                },
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
                        text: "Quest Log",
                        emoji: true,
                    },
                    action_id: "questLogButton",
                },
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
                    action_id: "achievementButton",
                },
                {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "My Profile",
                        emoji: true,
                    },
                    action_id: "profileButton",
                },
            ],
        },
    ];
};

module.exports = adminHomeView;
