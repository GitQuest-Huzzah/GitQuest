const Achievement = require("./server/db/models/Achievement");
const seed = () => {
    Achievement.bulkCreate([
        {
            commitValue: 1,
            achievementType: "commit",
            description: "Your first commit!",
        },
        { commitValue: 3, achievementType: "commit", description: "Your third commit!" },
        { commitValue: 5, achievementType: "commit", description: "Your fifth commit!" },
        {
            pullRequestValue: 1,
            achievementType: "pullRequest",
            description: "Your first pull request!",
        },
        {
            pullRequestValue: 3,
            achievementType: "pullRequest",
            description: "Your third pull request!",
        },
        {
            pullRequestValue: 5,
            achievementType: "pullRequest",
            description: "Your fifth pull request!",
        },
        { questsCompleted: 1, achievementType: "quest", description: "Your first quest!" },
        { questsCompleted: 3, achievementType: "quest", description: "Your third quest!" },
        { questsCompleted: 5, achievementType: "quest", description: "Your fifth quest!" },
    ]);
    console.log('seeding ends')
};
module.exports = seed;
