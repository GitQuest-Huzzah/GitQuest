const Quest = require("../db/models/Quest");
const Users = require("../db/models/Users");
const Workspaces = require("../db/models/Workspaces")

const addPRIDToQuest = async (reqBody) => {

    const user = await Users.findOne({
        where: {
            gitHubID:reqBody.sender.id.toString(), 
        },
        include: {
            model: Workspaces,
            where: {
                orgName: reqBody.organization.login
            },
        },
    });

    const quests = await Quest.findAll({
        where: {
            userId : user.id 
        },
    });
    
    const prQuest = quests.reduce((acc, quest)=>{
        if(reqBody.pull_request.title.split(' ')[0] === quest.keyword){
            acc = quest
        }
        return acc
    })


    if (prQuest) {
        prQuest.update({
            pullRequestID: reqBody.pull_request.id
        })
    }

};

module.exports = addPRIDToQuest;
