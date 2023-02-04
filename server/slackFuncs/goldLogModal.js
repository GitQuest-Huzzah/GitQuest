const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
const GoldLog = require("../db/models/Goldlog");
const Users = require("../db/models/Users");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const goldLogModal = async (reqBody) => {
    console.log(reqBody.user.id);
    const goldLogs = await GoldLog.findAll({
        include: {
            model: Users,
            where: {
                slackID: reqBody.user.id,
            },
        },
    });
    console.log(goldLogs);
    const token = await findTokenByTeamId(reqBody.user.team_id);
    await web.views.open({
        trigger_id: reqBody.trigger_id,
        token: token,
        view: {
            external_id: "adminAddOrgSubmit",
            type: "modal",
            title: {
                type: "plain_text",
                text: "Gold Log",
                emoji: true,
            },
            close: {
                type: "plain_text",
                text: "Close",
                emoji: true,
            },
            blocks: goldLogs.map((log) => {
                return {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `${log.dataValues.description} ${log.dataValues.valueChange}` 
                    },
                };
            }),
        },
    });
};

module.exports = goldLogModal;
