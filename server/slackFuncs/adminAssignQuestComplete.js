const Quest = require("../db/models/Quest");
const Users = require("../db/models/Users");
const Goldlog = require('../db/models/Goldlog')

const adminAssignQuestComplete = async (reqBody) => {
    console.log(reqBody.view.state.values);
    const quests =
        reqBody.view.state.values.questBlock.questAction.selected_options;
    const userId =
        reqBody.view.state.values.userSelectBlock.userSelectAction
            .selected_user;
    const user = await Users.findOne({
        where: {
            slackID: userId,
        },
    });

    if (user && quests.length) {
        quests.forEach(async (quest) => {
            const singleQuest = await Quest.findOne({
                where: {
                    id: quest.value,
                },
            });

            user.increment({
                gold: singleQuest.dataValues.goldValue,
                exp: singleQuest.dataValues.expValue,
            });

            const log = await Goldlog.create({
                description: `You recieved ${singleQuest.dataValues.goldValue} from completing a quest`,
                valueChange: `+ ${singleQuest.dataValues.goldValue}`
            })
            user.addGoldlog(log)

            singleQuest.update({
                status: "completed",
            });
        });
    }
};

module.exports = adminAssignQuestComplete;
