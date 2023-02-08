const {Quest, Workspaces} = require("../../server/db")
const findAllAvailableQuests = async(reqBody) => {
    const quests = await Quest.findAll({
        where: {
            status: "available",
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

module.exports = findAllAvailableQuests
