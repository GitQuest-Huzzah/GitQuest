const { WebClient } = require("@slack/web-api");
const findTokenByTeamId = require("./findTokenByTeam");
const viewQuestBlockFunc = require("./viewQuestBlockFunc");
//instantiating an instance of the slack Web Client API
const web = new WebClient();
const Quest = require("../db/models/Quest");
const Workspaces = require("../db/models/Workspaces");

const questLogModal = async (reqBody) => {
    const quests = await Quest.findAll({
        include: {
            model: Workspaces,
            where: {
                teamID: reqBody.user.team_id,
            },
        },
    });

    console.log(quests, "THESE ARE THE QUESTS");
    await web.views.open({
        trigger_id: reqBody.trigger_id,
        token: await findTokenByTeamId(reqBody.user.team_id),
        view: {
            type: "modal",
            callback_id:'questLogSubmit',
            title: {
                type: "plain_text",
                text: "Quest Log",
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
            blocks: quests
                ? quests.reduce((acc, quest, index, array) => {
                      if (array.length - 1 == index) {
                          return [
                              ...acc,
                              {
                                  type: "section",
                                  text: {
                                      type: "mrkdwn",
                                      text: `*Keyword* ${quest.dataValues.keyword}\n*Description* ${quest.dataValues.description}\n*Gold Value* ${quest.dataValues.goldValue}\n*Exp Value* ${quest.dataValues.expValue}\n*Availability* ${quest.dataValues.status}`,
                                  },
                              },

                              {
                                  type: "section",
                                  text: {
                                      type: "mrkdwn",
                                      text: "Select Availble Quest from Below",
                                  },
                                  accessory: {
                                      action_id: "questLogModalAction",
                                      type: "multi_external_select",
                                      placeholder: {
                                          type: "plain_text",
                                          text: "Select items",
                                      },
                                      min_query_length: 0,
                                  },
                              },
                          ];
                      } else {
                          acc = [
                              {
                                  type: "section",
                                  text: {
                                      type: "mrkdwn",
                                      text: `*Keyword* ${quest.dataValues.keyword}\n*Description* ${quest.dataValues.description}\n*Gold Value* ${quest.dataValues.goldValue}\n*Exp Value* ${quest.dataValues.expValue}\n*Availability* ${quest.dataValues.status}`,
                                  },
                              },
                              ...acc,
                          ];
                      }
                      return acc;
                  }, [])
                : [
                      {
                          type: "section",
                          text: {
                              type: "mrkdwn",
                              text: "This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>",
                          },
                      },
                  ],
        },
    });
};

module.exports = questLogModal;
