const Quest = require("../db/models/Quest");
const Workspaces = require("../db/models/Workspaces")

const findAllActiveQuests = async(reqBody) =>{
    const quests = await Quest.findAll({
        where: {
            status: "active",
        },
        include: {
            model: Workspaces,
            where: {
                teamID: reqBody.user.team_id,
            },
        },
    });
    return quests
};

module.exports = findAllActiveQuests
