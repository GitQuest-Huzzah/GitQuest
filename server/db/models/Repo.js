const Sequelize = require("sequelize");
const db = require("../db");

const Repo = db.define("repo", {
	repoId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	repoName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Repo;
