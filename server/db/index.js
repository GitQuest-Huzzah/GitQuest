const Achievement = require("./models/Achievement");
const Channel = require("./models/Channel");
const db = require("./db");
const Goldlog = require("./models/Goldlog");
const Playerstat = require("./models/Playerstat");
const Quest = require("./models/Quest");
const Repo = require("./models/Repo");
const Users = require("./models/Users");
const Workspace = require("./models/Workspace");

//model associations

Users.belongsTo(Workspace);
Workspace.hasMany(Users);

Repo.belongsTo(Workspace);
Workspace.hasMany(Repo);

Playerstat.belongsTo(Users);
Users.belongsTo(Playerstat);

Users.hasMany(Goldlog);
Goldlog.belongsTo(Users);

Workspace.hasMany(Quest);
Quest.belongsTo(Workspace);

Users.hasMany(Quest);
Quest.belongsTo(Users);

Workspace.hasMany(Channel);
Channel.belongsTo(Workspace);

Users.belongsToMany(Achievement, { through: "users_achievement" });
Achievement.belongsToMany(Users, { through: "users_achievement" });

// (async()=>{

// const playerOne = await Users.findOne({
//     where:{
//         id: 1
//     }
// })
// const playerTwo = await Users.findOne({
//     where:{
//         id: 2
//     }
// })

// const statOne = await Playerstat.create()
// const statTwo = await Playerstat.create()

// playerOne.setPlayerstat(statOne)
// statOne.setUser(playerOne)
// playerTwo.setPlayerstat(statTwo)
// statTwo.setUser(playerTwo)

// })()
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
    Repo,
    Users,
    Workspace,
    Quest,
    Playerstat,
};

// const testQuery = async () => {
// 	try {
// 		const adminUser = await Users.findOne({
// 			where: {
// 				id: 1, //this would be slackID in the real thing
// 			},
// 			include: {
// 				model: Workspaces,
// 			},
// 		});
// 		// console.log(adminUser)
// 		const time = Math.round(new Date().getTime() / 1000);
// 		const yesterday = time - 24 * 3600;
// 		const questsReturn = await Quest.findAll({
// 			where: {
// 				updatedAt: {
// 					[Op.between]: [yesterday, new Date()],
// 				},
// 			},
// 			include: [
// 				{
// 					model: Workspaces,
// 					where: {
// 						id: adminUser.dataValues.workspaceId,
// 					},
// 				},
// 				{ model: Users },
// 			],
// 		});
// 		console.log(questsReturn);
// 		return questsReturn;
// 	} catch (error) {
// 		console.error(error);
// 	}
// };

// // console.log(tsYesterday);
// console.log(testQuery(), "promise?");
