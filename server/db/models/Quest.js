const Sequelize = require("sequelize");
const db = require("../db.js");

const Quest = db.define("quest", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	keyword: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	goldValue: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	expValue: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	status: {
		type: Sequelize.ENUM("completed", "active", "available", "discarded"),
		allowNull: false,
		defaultValue: "available",
	},
	pullRequestID: {
		type: Sequelize.INTEGER,
	},
});

module.exports = Quest;
