const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const questDisplayFunc = require("./questDisplayFunc")
const findAllActiveQuestPerUser = require('./findAllActiveQuestPerUser')

const questLogModal = async (reqBody) => {

    const quests = await findAllActiveQuestPerUser(reqBody)

    await web.views.open({
        trigger_id: reqBody.trigger_id,
        token: await findTokenByTeamId(reqBody.user.team_id),
        view: {
            type: "modal",
            callback_id: "questLogSubmit",
            title: {
                type: "plain_text",
                text: "Your Active Quests",
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
            blocks: questDisplayFunc(quests, "active")

        },
    });
};

module.exports = questLogModal;
