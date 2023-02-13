const questDisplay = (quests, status) => {
	if (quests.length) {
		let returnArr = quests.map(({dataValues:{name, keyword, description,goldValue, expValue, status}}) => {
			return {
				type: "section",
				text: {
					type: "mrkdwn",
					text: `*Name* ${name}\n*Keyword* ${keyword}\n*Description* ${description}\n*Gold Value* ${goldValue}\n*Exp Value* ${expValue}\n*Availability* ${status}`,
				},
			};
		});

		returnArr = [
			...returnArr,
			{
				type: "section",
				block_id: "questBlock",
				text: {
					type: "mrkdwn",
					text:
						status === "available"
							? "Select Available Quests"
							: status === "active"
							? "*_Surrender a Quest?! Select below and submit..._*"
							: "Select Quest to complete to a Player",
				},
				accessory: {
					action_id: "questAction",
					type: "multi_external_select",
					placeholder: {
						type: "plain_text",
						text: "Select Quests",
					},
					min_query_length: 0,
				},
			},
			!status
				? {
						type: "section",
						block_id: "userSelectBlock",
						text: {
							type: "mrkdwn",
							text: "Select User to assign Awards!",
						},
						accessory: {
							type: "users_select",
							placeholder: {
								type: "plain_text",
								text: "Select a user",
								emoji: true,
							},
							action_id: "userSelectAction",
						},
				  }
				: {
						type: "divider",
				  },
		];
		return returnArr;
	} else {
		let returnArr = [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text:
						status === "available"
							? "There are no available Quests"
							: status === "active"
							? "_*You do not have any active Quests*_"
							: "There are no active quests to assign",
				},
			},
		];
		return returnArr;
	}
};

module.exports = questDisplay;
