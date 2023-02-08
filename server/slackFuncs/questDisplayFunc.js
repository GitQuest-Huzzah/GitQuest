const questDisplayFunc = (quests, status) => {
    if (quests.length) {
        let returnArr = quests.map((quest) => {
            return {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*Name* ${quest.dataValues.name}\n*Keyword* ${quest.dataValues.keyword}\n*Description* ${quest.dataValues.description}\n*Gold Value* ${quest.dataValues.goldValue}\n*Exp Value* ${quest.dataValues.expValue}\n*Availability* ${quest.dataValues.status}`,
                },
            };
        });

        returnArr = [
            ...returnArr,
            {
                type: "section",
                block_id: "questBlock",
                text: {
                    type: "mrkdwn",
                    text:
                        status === "available"
                            ? "Select Available Quests"
                            : "Want to give up  on a Quest? Select below and submit",
                },
                accessory: {
                    action_id: "questAction",
                    type: "multi_external_select",
                    placeholder: {
                        type: "plain_text",
                        text: "Select items",
                    },
                    min_query_length: 0,
                },
            },
        ];
        return returnArr;
    } else {
        let returnArr = [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text:
                        status === "available"
                            ? "There are no available Quests"
                            : "You do not have any active Quests",
                },
            },
        ];
        return returnArr;
    }
};

module.exports = questDisplayFunc;
