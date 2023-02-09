const db = require("./db");
const Channel = require("./models/Channel");
const Repos = require("./models/Repos");
const Users = require("./models/Users");
const Workspaces = require("./models/Workspaces");
const Goldlog = require("./models/Goldlog");
const Quest = require("./models/Quest");
const { Op } = require("sequelize");
//model associations

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

module.exports = {
	db,
	Goldlog,
	Repos,
	Users,
	Workspaces,
	Quest,
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
