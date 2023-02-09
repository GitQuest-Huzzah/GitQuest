const userHomeView = (user) => {
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
				text: `Welcome ${user.dataValues.gitHubLogin}!`,
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

module.exports = userHomeView;
