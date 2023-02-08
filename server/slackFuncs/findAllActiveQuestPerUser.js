const Quest = require("../db/models/Quest");
const Workspaces = require("../db/models/Workspaces");
const Users = require('../db/models/Users')

const findAllActiveQuestsPerUser = async (reqBody) => {
    const user = await Users.findOne({
        where: {
            slackID: reqBody.user.id,
        },
    });

    const quests = await Quest.findAll({
        where: {
            status: "active",
            userId: user.id,
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

module.exports = findAllActiveQuestsPerUser
