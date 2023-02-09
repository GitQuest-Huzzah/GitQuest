const Sequelize = require("sequelize");
const db = require("../db.js");

const Achievement = db.define("achievement", {
	commitValue: {
		type: Sequelize.INTEGER,
	},
	pullRequestValue: {
		type: Sequelize.INTEGER,
	},
	questsCompleted: {
		type: Sequelize.INTEGER,
	},
	achievementType: {
		type: Sequelize.STRING,
        allowNull: false,
	},
    description: {
		type: Sequelize.STRING,
        allowNull: false,
	},
});

module.exports = Achievement;
