const Quest = require("../db/models/Quest");
const Users = require("../db/models/Users");

const questLog = async (reqBody) => {

    const selectedQuests =
        reqBody.view.state.values.questLogModalBlock.questLogModalAction
            .selected_options;

    const user = await Users.findOne({
        where: {
            slackID: reqBody.user.id,
        },
    });

    selectedQuests.forEach(async (quest) => {
        console.log(quest)
        singleQuest = await Quest.findOne({
            where: {
                id: quest.value
            },
        });
        user.addQuest(singleQuest);
        await singleQuest.update({
            status: 'active'
        })
    });
};

module.exports = questLog;
