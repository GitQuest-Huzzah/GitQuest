const adminHomeView = (user, gHLink) => {
	return [
		{
			type: "image",
			image_url: `https://storage.googleapis.com/slackphotos/gqbanner.png`,
			alt_text: "Git Quest Banner",
		},
		{
			type: "header",
			text: {
				type: "plain_text",
				text: "Setup Your Adventure!",
			},
		},
		{
			type: "divider",
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":one: Set Org Name",
						emoji: true,
					},
					value: "Add or Update Org Name",
					action_id: "adminOrgModalButton",
				},
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":two: Connect To GitHub",
						emoji: true,
					},
					value: "Link Org To GitHub",
					url: gHLink,
				},
			],
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":three: Connect Repos",
						emoji: true,
					},
					value: "Repos to connect",
					action_id: "adminRepoModalButton",
				},
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":four: Connect User",
						emoji: true,
					},
					value: "Connect User To GitHub Account",
					action_id: "adminGitConnectUserModalButton",
				},
			],
		},
		{
			type: "divider",
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":skull_and_crossbones: Unfollow Repos",
						emoji: true,
					},
					value: "Repos to Delete",
					action_id: "adminRepoDeleteModalButton",
				},
			],
		},
		{
			type: "header",
			text: {
				type: "plain_text",
				text: "Quests!",
			},
		},
		{
			type: "divider",
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":dragon_face: Add Quest",
						emoji: true,
					},
					action_id: "addQuestButton",
				},
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":crown: Manage Quests",
						emoji: true,
					},
					action_id: "assignQuestCompleteButton",
				},
			],
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":chart_with_upwards_trend: Quest Activity",
						emoji: true,
					},
					action_id: "questActivityButton",
				},
			],
		},
		{
			type: "header",
			text: {
				type: "plain_text",
                text: `Welcome ${user.dataValues.gitHubLogin ? user.dataValues.gitHubLogin : 'Hero'}!`,
			},
		},
		{
			type: "divider",
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":crossed_swords: My Profile",
						emoji: true,
					},
					action_id: "profileButton",
				},
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":trophy: Achievements",
						emoji: true,
					},
					action_id: "achievementButton",
				},
			],
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":crystal_ball: Available Quests",
						emoji: true,
					},
					action_id: "viewQuestsButton",
				},
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":scroll: Quest Log",
						emoji: true,
					},
					action_id: "questLogButton",
				},
			],
		},
		{
			type: "actions",
			elements: [
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":moneybag: Gold Log",
						emoji: true,
					},
					action_id: "goldLogButton",
				},
				{
					type: "button",
					text: {
						type: "plain_text",
						text: ":money_with_wings: Reward Gold",
						emoji: true,
					},
					action_id: "giveGoldButton",
				},
			],
		},
		{
			type: "divider",
		},
	];
};

module.exports = adminHomeView;
