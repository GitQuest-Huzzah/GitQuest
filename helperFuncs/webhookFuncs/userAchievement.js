const { Achievement, Users } = require("../../server/db");

const userAchievement = async (user, commits, pulls, numQuestCompleted) => {
    const achievements = await Achievement.findAll();

    console.log(
        user.achievements[0].user_achievement,
        "THIS IS THE USER IN THROUGH TABLES"
    );
    console.log(
        user.dataValues.achievements,
        "THIS IS ON THE USER IN DATAVALUES"
    );

    //find the highest achievement that the user should have, and then compare that to the current achievement of the user. If they have it, do nothing, if they don't, add it to their current achievements

    let commitAchieve;
    let pullAchieve;
    let questAchieve;

    const findHighestAchievement = (commits, pulls, numQuestCompleted) => {
        for (const achievement of achievements) {
            console.log(
                achievement,
                "this is achievement passed in the for loop"
            );
            if (
                commits >= achievement.dataValues.commitValue &&
                achievement.dataValues.commitValue
            ) {
                commitAchieve = achievement.dataValues.id;
            }
        }
        for (const achievement of achievements) {
            console.log(
                achievement,
                "this is achievement passed in the for loop"
            );
            if (
                pulls >= achievement.dataValues.pullRequestValue &&
                achievement.dataValues.pullRequestValue
            ) {
                pullAchieve = achievement.dataValues.id;
            }
        }
        for (const achievement of achievements) {
            console.log(
                achievement,
                "this is achievement passed in the for loop"
            );
            if (
                numQuestCompleted >= achievement.dataValues.questsCompleted &&
                achievement.dataValues.questsCompleted
            ) {
                questAchieve = achievement.dataValues.id;
            }
        }
        const result = [pullAchieve, commitAchieve, numQuestCompleted];
        console.log(result);
        user.addAchievements(
            result.filter((achievement) => (achievement ? true : false))
        );
    };

    findHighestAchievement(commits, pulls, numQuestCompleted);
    console.log(commits, "This is commits coming into this function");
    console.log(commitAchieve, "This is the achievement ID");
};

module.exports = userAchievement;
