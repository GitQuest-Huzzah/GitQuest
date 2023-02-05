const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
const Users = require("../db/models/Users");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const goldLogModal = async (reqBody) => {
    console.log(reqBody.user.id);
    const {dataValues:{achievements}} = await Users.findOne({
            where: {
                slackID: reqBody.user.id,
            },
    });
    const token = await findTokenByTeamId(reqBody.user.team_id);
    await web.views.open({
        trigger_id: reqBody.trigger_id,
        token: token,
        view: {
            external_id: "achievementsModal",
            type: "modal",
            title: {
                type: "plain_text",
                text: "Achievements",
                emoji: true,
            },
            close: {
                type: "plain_text",
                text: "Close",
                emoji: true,
            },
            blocks: JSON.parse(achievements).map((log) => {
                return {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `${Object.values(log)[0]}`
                    },
                };
            }),
        },
    });
};

module.exports = goldLogModal;
