const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const addQuestModal = async (reqBody) => {
    await web.views.open({
        trigger_id: reqBody.trigger_id,
        token: await findTokenByTeamId(reqBody.user.team_id),
        view: {
            type: "modal",
            callback_id: 'addQuestSubmit',
            title: {
                type: "plain_text",
                text: "Add Quest",
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
                    text: {
                        type: "mrkdwn",
                        text: "Fill out the Quest to add to the Quest Log!\n Have fun!",
                    },
                },
                {
                    type: "input",
                    block_id:'name',
                    element: {
                        type: "plain_text_input",
                        action_id: "nameAction",
                    },
                    label: {
                        type: "plain_text",
                        text: "Name",
                        emoji: true,
                    },
                },
                {
                    type: "input",
                    block_id:'keyword',
                    element: {
                        type: "plain_text_input",
                        action_id: "keywordAction",
                    },
                    label: {
                        type: "plain_text",
                        text: "Keyword",
                        emoji: true,
                    },
                },
                {
                    type: "input",
                    block_id:'description',
                    element: {
                        type: "plain_text_input",
                        multiline: true,
                        action_id: "descriptionAction",
                    },
                    label: {
                        type: "plain_text",
                        text: "Description",
                        emoji: true,
                    },
                },
                {
                    type: "input",
                    block_id:'goldValue',
                    element: {
                        type: "number_input",
                        is_decimal_allowed: false,
                        action_id: "goldValueAction",
                    },
                    label: {
                        type: "plain_text",
                        text: "Gold Value",
                        emoji: true,
                    },
                },
                {
                    type: "input",
                    block_id:'expValue',
                    element: {
                        type: "number_input",
                        is_decimal_allowed: false,
                        action_id: "expValueAction",
                    },
                    label: {
                        type: "plain_text",
                        text: "Exp Value",
                        emoji: true,
                    },
                },
            ],
        },
    });
};

module.exports = addQuestModal;
