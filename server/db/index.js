const Achievement = require("./models/Achievement");
const Channel = require("./models/Channel");
const db = require("./db");
const Goldlog = require("./models/Goldlog");
const Quest = require("./models/Quest");
const Repos = require("./models/Repos");
const Users = require("./models/Users");
const Workspaces = require("./models/Workspaces");

//model associations
console.log(Achievement);
console.log(Channel);
console.log(Users);

Users.belongsTo(Workspaces);
Workspaces.hasMany(Users);

Repos.belongsTo(Workspaces);
Workspaces.hasMany(Repos);

Users.hasMany(Goldlog);
Goldlog.belongsTo(Users);

Workspaces.hasMany(Quest);
Quest.belongsTo(Workspaces);

Users.hasMany(Quest);
Quest.belongsTo(Users);

Workspaces.hasMany(Channel);
Channel.belongsTo(Workspaces);

Users.belongsToMany(Achievement, { through: "users_achievement" });
Achievement.belongsToMany(Users, { through: "users_achievement" });

// Achievement.bulkCreate([
//     {
//         commitValue: 1,
//         achievementType: "commit",
//         description: "Your first commit!",
//     },
//     {
//         commitValue: 3,
//         achievementType: "commit",
//         description: "Your third commit!",
//     },
//     {
//         commitValue: 5,
//         achievementType: "commit",
//         description: "Your fifth commit!",
//     },
//     {
//         pullRequestValue: 1,
//         achievementType: "pullRequest",
//         description: "Your first pull request!",
//     },
//     {
//         pullRequestValue: 3,
//         achievementType: "pullRequest",
//         description: "Your third pull request!",
//     },
//     {
//         pullRequestValue: 5,
//         achievementType: "pullRequest",
//         description: "Your fifth pull request!",
//     },
//     {
//         questsCompleted: 1,
//         achievementType: "quest",
//         description: "Your first quest!",
//     },
//     {
//         questsCompleted: 3,
//         achievementType: "quest",
//         description: "Your third quest!",
//     },
//     {
//         questsCompleted: 5,
//         achievementType: "quest",
//         description: "Your fifth quest!",
//     },
// ]);

module.exports = {
    Achievement,
    db,
    Goldlog,
    Repos,
    Users,
    Workspaces,
    Quest,
};
