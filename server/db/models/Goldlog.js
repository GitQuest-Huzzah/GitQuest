const Sequelize = require("sequelize");
const db = require("../db.js");

const Goldlog = db.define("goldlog", {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	valueChange: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Goldlog;
