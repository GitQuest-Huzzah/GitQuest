const Sequelize = require("sequelize");
const db = require("../db");

const Playerstat = db.define("playerstat", {
	commits: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	pullRequests: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	questsCompleted: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	level: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
	},
	title: {
		type: Sequelize.STRING,
		defaultValue: "Neophyte",
	},
	exp: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	gold: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	rewardGold: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
});

module.exports = Playerstat;
