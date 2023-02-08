const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const questDisplayFunc = require('./questDisplayFunc')
const findAllAvailableQuests = require('./findAllAvailableQuests')

const viewQuestsModal = async (reqBody) => {
const quests = await findAllAvailableQuests(reqBody)
    console.log(quests)
    await web.views.open({
        trigger_id: reqBody.trigger_id,
        token: await findTokenByTeamId(reqBody.user.team_id),
        view: {
            type: "modal",
            callback_id: "viewQuestsSubmit",
            title: {
                type: "plain_text",
                text: "View Quests",
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
            blocks: questDisplayFunc(quests, 'available')
        },
    });
};

module.exports = viewQuestsModal;
