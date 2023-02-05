const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const giveGoldModal = async (reqBody) => {
    const token = await findTokenByTeamId(reqBody.user.team_id);
    await web.views.open({
        trigger_id: reqBody.trigger_id,
        token: token,
        view: {
            type: "modal",
            callback_id:"giveGoldSubmit",
            title: {
                type: "plain_text",
                text: "Give Gold to Give!",
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
                    block_id:"userSelected",
                    text: {
                        type: "mrkdwn",
                        text: "Who ya givin gold to?",
                    },
                    accessory: {
                        type: "users_select",
                        placeholder: {
                            type: "plain_text",
                            text: "Select a user",
                            emoji: true,
                        },
                        action_id: "selectedUser",
                    },
                },
                {
                    type: "input",
                    block_id:"amountGiven",
                    element: {
                        type: "number_input",
                        is_decimal_allowed: false,
                        action_id: "givenAmount",
                    },
                    label: {
                        type: "plain_text",
                        text: "Amount to Give",
                        emoji: true,
                    },
                },
            ],
        },
    });
};

module.exports = giveGoldModal;
