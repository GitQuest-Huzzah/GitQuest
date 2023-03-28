"use strict";

const { Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Workspaces", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
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
				type: Sequelize.STRING,
				defaultValue: "individual",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.createTable("Repos", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			repoId: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			repoName: {
				type: Sequelize.STRING,
			},
			workspaceId: {
				allowNull: false,
				references: {
					model: "Workspaces",
				},
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.createTable("Achievements", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			commitValue: {
				type: Sequelize.INTEGER,
			},
			puillRequestValue: {
				type: Sequelize.INTEGER,
			},
			questsCompleted: {
				type: Sequelize.INTEGER,
			},
			achievementType: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.createTable("Channels", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			slackID: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			workspaceId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Workspaces",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
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
				allowNull: false,
				defaultValue: false,
			},
			workspaceId: {
				allowNull: false,
				references: {
					model: "Workspaces",
				},
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.createTable("Goldlogs", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			valueChange: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.createTable("Playerstats", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
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
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
				},
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.createTable("Quests", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
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
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "available",
			},
			pullRequestID: {
				type: Sequelize.INTEGER,
			},
			workspaceId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Workspaces",
				},
				allowNull: false,
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
				},
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.addColumn("Users", "playerstatId", Sequelize.INTEGER);

		await queryInterface.createTable("User_Achievements", {
			userId: {
				allowNull: false,
				references: {
					model: "Users",
				},
				type: Sequelize.INTEGER,
			},
			achievementId: {
				allowNull: false,
				references: {
					model: "Achievements",
				},
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Workspaces");
		await queryInterface.dropTable("Users");
		await queryInterface.dropTable("Achievements");
		await queryInterface.dropTable("Channels");
		await queryInterface.dropTable("Goldlogs");
		await queryInterface.dropTable("Playerstats");
		await queryInterface.dropTable("Quests");
		await queryInterface.dropTable("Repos");
	},
};
