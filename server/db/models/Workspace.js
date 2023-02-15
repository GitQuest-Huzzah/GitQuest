const Sequelize = require("sequelize");
const db = require("../db");

const Workspace = db.define("workspace", {
	botToken: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	teamID: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	teamName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	orgName: {
		type: Sequelize.STRING,
	},
	ghType: {
		type: Sequelize.ENUM("individual", "organization"),
		defaultValue:"individual"
	}
});

module.exports = Workspace;
