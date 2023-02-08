const expLevel = require("./expLevel");
const commitAchievements = require("./commitAchievements");
const pullRequestAchievements = require("./pullRequestAchievements");
const titles = require("./titles");
const { Users, Workspaces, Goldlog } = require("../server/db");
const userLevelFunc = require("./userLevelFunc");
const userTitleFunc = require("./userTitleFunc");
const pullReqAchieveFunc = require("./pullReqAchieveFunc");
const commitReqAchieveFunc = require("./commitReqAchieveFunc");

const updateUserOnPR = async (reqBody) => {

    const user = await Users.findOne({
        where: {
            gitHubID: reqBody.sender.id.toString()
        },
        include: {
            model: Workspaces,
            where: {
                orgName: reqBody.organization.login
            },
        },
    });

    const numOfCommits = reqBody.pull_request.commits + user.dataValues.commits;
    const userExp = numOfCommits * 10;
    const numOfPulls = user.dataValues.pullRequests + 1;

    const currLevel = user.dataValues.level;
    let userGold = user.dataValues.gold;
    let rewardGold = user.dataValues.rewardGold;
    const userAchievements = user.dataValues.achievements;

    const achievementsPR = pullRequestAchievements();
    const achievementsCommit = commitAchievements();
    const levels = expLevel();
    const title = titles();

    // update gold and reward gold based on leveling up
    const userLevel = userLevelFunc(levels, Object.keys(levels), userExp);
    if (userLevel > currLevel) {
        let levelDiff = userLevel - currLevel;
        userGold = userGold + 250 * levelDiff;
        rewardGold = rewardGold + 50 * levelDiff;
        const goldLog = await Goldlog.create({
            description: `You've received ${
                levelDiff * 250
            } gold from leveling up!`,
            valueChange: `+${levelDiff * 250}`,
        });
        user.addGoldlog(goldLog);
    }

    // update user's title based on current level number
    const userTitle = userTitleFunc(title, Object.keys(title), userLevel);
    // identify the most recent achievement based on pull requests
    const userPRAchieve = pullReqAchieveFunc(
        achievementsPR,
        Object.keys(achievementsPR),
        numOfPulls
    );
    // identify the most recent achievement for commits
    const userCommitAchieve = commitReqAchieveFunc(
        achievementsCommit,
        Object.keys(achievementsCommit),
        numOfCommits
    );

    // check to see if user achievements already exist
    // either add the initial achievement, or add new achievements to existing
    let userAchievementJSON;
    if (userAchievements) {
        let parsedUserAchievements = JSON.parse(userAchievements);
        let commitAchieveCount = 0
        for (const achieve of parsedUserAchievements) {
            if (JSON.stringify(achieve) === JSON.stringify(userCommitAchieve)) {
                commitAchieveCount += 1
                // parsedUserAchievements = [
                //     ...parsedUserAchievements,
                //     userCommitAchieve,
                // ];
                // break;
            }
        }
        if (commitAchieveCount === 0){
                parsedUserAchievements = [
                    ...parsedUserAchievements,
                    userCommitAchieve,
                ];

        }

        let userPRAchieveCount = 0
        for (const achieve of parsedUserAchievements) {
            if (JSON.stringify(achieve) === JSON.stringify(userPRAchieve)) {
                userPRAchieveCount++
                // parsedUserAchievements = [
                //     ...parsedUserAchievements,
                //     userPRAchieve,
                // ];
                // break;
            }
        }

        if(userPRAchieveCount === 0){
                parsedUserAchievements = [
                    ...parsedUserAchievements,
                    userPRAchieve,
                ];

        }

        userAchievementJSON = JSON.stringify(parsedUserAchievements);
    } else {
        userAchievementJSON = JSON.stringify([
            userCommitAchieve,
            userPRAchieve,
        ]);
    }
    await user.update({
        commits: numOfCommits,
        pullRequests: numOfPulls,
        level: userLevel,
        title: userTitle,
        exp: userExp,
        achievements: userAchievementJSON,
        gold: userGold,
        rewardGold: rewardGold,
    });
};

module.exports = updateUserOnPR;
