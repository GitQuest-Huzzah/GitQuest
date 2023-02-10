const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true,
		},
	},
	slackID: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	gitHubID: {
		type: Sequelize.STRING,
	},
	gitHubLogin: {
		type: Sequelize.STRING,
	},
	gitHubToken: {
		type: Sequelize.STRING,
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
});

module.exports = User;
