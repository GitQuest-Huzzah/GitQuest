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

    await web.views.open({
        trigger_id: reqBody.trigger_id,
        token: await findTokenByTeamId(reqBody.user.team_id),
        view: {
            type: "modal",
            callback_id:'viewQuestsSubmit',
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
            blocks: quests
                ? quests.reduce((acc, quest, index, array) => {
                      if (array.length - 1 == index) {
                          return [
                              ...acc,
                              {
                                  type: "section",
                                  text: {
                                      type: "mrkdwn",
                                      text: `*Name* ${quest.dataValues.name}\n*Keyword* ${quest.dataValues.keyword}\n*Description* ${quest.dataValues.description}\n*Gold Value* ${quest.dataValues.goldValue}\n*Exp Value* ${quest.dataValues.expValue}\n*Availability* ${quest.dataValues.status}`,
                                  },
                              },

                              {
                                  type: "section",
                                      block_id:"viewQuestsModalBlock",
                                  text: {
                                      type: "mrkdwn",
                                      text: "Select Availble Quest from Below",
                                  },
                                  accessory: {
                                      action_id: "viewQuestsModalAction",
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
                                      text: `*Name* ${quest.dataValues.name}\n*Keyword* ${quest.dataValues.keyword}\n*Description* ${quest.dataValues.description}\n*Gold Value* ${quest.dataValues.goldValue}\n*Exp Value* ${quest.dataValues.expValue}\n*Availability* ${quest.dataValues.status}`,
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
                              text: "There are no quests! Ask your quest giver to give ya some!",
                          },
                      },
                  ],
        },
    });
};

module.exports = questLogModal;
