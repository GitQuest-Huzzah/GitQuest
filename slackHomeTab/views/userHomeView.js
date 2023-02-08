const userHomeView = (user) => {
    return [
        {
            type: "image",
            image_url: `https://storage.googleapis.com/slackphotos/gqbanner.png`,
            alt_text: "Git Quest Banner",
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
                        text: "View Available Quests",
                        emoji: true,
                    },
                    action_id: "viewQuestsButton",
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

module.exports = userHomeView;
