"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Workspaces", [
			{
				botToken: "demoWorkspaceBotToken",
				teamID: "demoWorkspaceTeamID",
				teamName: "demoWorkspaceTeamName",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
		await queryInterface.bulkInsert("Users", [
			{
				email: "demoUser@email.com",
				slackID: "demoUserSlackID",
				gitHubID: "demoUserGitHubID",
				isAdmin: true,
        workspaceId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
