const { Users, Workspaces, Playerstat } = require("../../server/db");
const userLevelFunc = require("./userLevelFunc");

const updateUserOnPR = async (reqBody) => {
    const user = await Users.findOne({
        where: {
            gitHubID: reqBody.sender.id.toString(),
        },
        include: [
            {
                model: Workspaces,
                where: {
                    orgName: reqBody.organization.login,
                },
            },
            {
                model: Playerstat,
            },
        ],
    });

    const numOfCommits = reqBody.pull_request.commits + user.dataValues.commits;
    const gainedExp = reqBody.pull_request.commits * 10;
    const numOfPulls = user.dataValues.pullRequests + 1;

    userLevelFunc(user, gainedExp);
    userAchievement(user, numOfCommits, numOfPulls);

    // identify the most recent achievement based on pull requests
    await Playerstat.update(
        {
            commits: numOfCommits,
            pullRequests: numOfPulls,
        },
        {
            where: {
                userId: user.dataValues.id,
            },
        }
    );
};

module.exports = updateUserOnPR;
