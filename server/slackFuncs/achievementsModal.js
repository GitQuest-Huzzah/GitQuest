const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
const Users = require("../db/models/Users");
//instantiating an instance of the slack Web Client API
const web = new WebClient();

const achievementsModal = async (reqBody) => {
    const {
        dataValues: { achievements },
    } = await Users.findOne({
        where: {
            slackID: reqBody.user.id,
        },
    });
    const parsedAchievements = JSON.parse(achievements);
    const token = await findTokenByTeamId(reqBody.user.team_id);
    await web.views.open({
        trigger_id: reqBody.trigger_id,
        token: token,
        view: {
            callback_id: "achievementsModal",
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
            blocks: parsedAchievements
                ? parsedAchievements.map((log) => {
                      return {
                          type: "section",
                          text: {
                              type: "mrkdwn",
                              text: `${Object.values(log)[0]}`,
                          },
                      };
                  })
                : [
                      {
                          type: "section",
                          text: {
                              type: "mrkdwn",
                              text: `You don't have any achievements!`,
                          },
                      },
                  ],
        },
    });
};

module.exports = achievementsModal;
