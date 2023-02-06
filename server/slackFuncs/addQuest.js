const { WebClient } = require("@slack/web-api");
const web = new WebClient();
const Workspaces = require("../db/models/Workspaces");
const Quest = require("../db/models/Quest");

const addQuest = async (reqBody) => {
    const keyword = reqBody.view.state.values.keyword.keywordAction.value;
    const description =
        reqBody.view.state.values.description.descriptionAction.value;
    const expValue = reqBody.view.state.values.expValue.expValueAction.value;
    const goldValue = reqBody.view.state.values.goldValue.goldValueAction.value;

    const workspace = await Workspaces.findOne({
        where: {
            teamID: reqBody.user.team_id,
        },
    });

    const quest = await Quest.create({
        keyword, 
        description, 
        expValue, 
        goldValue
    })
     workspace.addQuest(quest)
};

module.exports = addQuest;
