const { WebClient } = require("@slack/web-api");
const { User, Goldlog, Playerstat } = require("../../server/db");
const findTokenByTeamId = require("../queryFuncs/findTokenByTeamId");
const web = new WebClient();

const giveGold = async (reqBody) => {
	const selectedUser =
		reqBody.view.state.values.userSelected.selectedUser.selected_user;
	const goldExchanged = reqBody.view.state.values.amountGiven.givenAmount.value;
	const receivingUser = await User.findOne({
		where: {
			slackID: selectedUser,
		},
	});

	const sendingUser = await User.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include: {
			model: Playerstat,
		},
	});

	if (sendingUser.dataValues.playerstat.dataValues.rewardGold < goldExchanged) {
		await web.chat.postMessage({
			blocks: [
				{
					type: "section",
					text: {
						type: "mrkdwn",
						text: "You don't have that much gold to give!",
					},
				},
			],
			channel: reqBody.user.id,
			token: await findTokenByTeamId(reqBody.user.team_id),
		});
		return console.log("exiting");
	}

	if (reqBody.user.id === selectedUser) {
		await web.chat.postMessage({
			blocks: [
				{
					type: "section",
					text: {
						type: "mrkdwn",
						text: "Can't give your self gold buddy!",
					},
				},
			],
			channel: reqBody.user.id,
			token: await findTokenByTeamId(reqBody.user.team_id),
		});
		return console.log("exiting");
	}

	if (!receivingUser) {
		await web.chat.postMessage({
			blocks: [
				{
					type: "section",
					text: {
						type: "mrkdwn",
						text: "Adventurer you are trying to give gold to doesn't exist",
					},
				},
			],
			channel: reqBody.user.id,
			token: await findTokenByTeamId(reqBody.user.team_id),
		});
		return console.log("exiting");
	}
	Playerstat.decrement("rewardGold", {
		by: goldExchanged,
		where: {
			userId: sendingUser.dataValues.id,
		},
	});
	Playerstat.increment("gold", {
		by: goldExchanged,
		where: {
			userId: receivingUser.dataValues.id,
		},
	});
	const receivingUserLog = await Goldlog.create({
		description: `${sendingUser.dataValues.gitHubLogin} gave you gold!`,
		valueChange: `+ ${goldExchanged}`,
	});
	receivingUser.addGoldlog(receivingUserLog);
};

module.exports = giveGold;