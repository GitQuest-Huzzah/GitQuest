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
    console.log(user, 'this is the user')

    const quests = await Quest.findAll({
        where: {
            userId : user.id 
        },
    });
    console.log(quests, 'this is all the users quests')
    
    const prQuest = quests.reduce((acc, quest)=>{
        if(reqBody.pull_request.title.split(' ')[0] === quest.keyword){
            acc = quest
        }
        return acc
    })

    console.log(prQuest, 'this is the quest that is associated with the PR')

    if (prQuest) {
        prQuest.update({
            pullRequestID: reqBody.pull_request.id
        })
    }

};

module.exports = addPRIDToQuest;
