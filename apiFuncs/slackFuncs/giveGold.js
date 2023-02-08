const { WebClient } = require("@slack/web-api");

const { Goldlog, Users } = require("../../server/db");
const findTokenByTeamId = require("./findTokenByTeamId");
const web = new WebClient();

const giveGold = async (reqBody) => {
	const recievingUser = await Users.findOne({
		where: {
			slackID:
				reqBody.view.state.values.userSelected.selectedUser.selected_user,
		},
	});

	const sendingUser = await Users.findOne({
		where: {
			slackID: reqBody.user.id,
		},
	});

	if (
		sendingUser.dataValues.rewardGold <
		reqBody.view.state.values.amountGiven.givenAmount.value
	) {
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

	if (
		reqBody.user.id ===
		reqBody.view.state.values.userSelected.selectedUser.selected_user
	) {
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

	if (!recievingUser) {
		await web.chat.postMessage({
			blocks: [
				{
					type: "section",
					text: {
						type: "mrkdwn",
						text: "User you are trying to give gold too doens't exist in the database",
					},
				},
			],
			channel: reqBody.user.id,
			token: await findTokenByTeamId(reqBody.user.team_id),
		});
		return console.log("exiting");
	}

	await sendingUser.decrement("rewardGold", {
		by: reqBody.view.state.values.amountGiven.givenAmount.value,
	});
	await recievingUser.increment("gold", {
		by: reqBody.view.state.values.amountGiven.givenAmount.value,
	});
	const recievingUserLog = await Goldlog.create({
		description: "Someone gave you gold!",
		valueChange: `+ ${reqBody.view.state.values.amountGiven.givenAmount.value}`,
	});
	await recievingUser.addGoldlog(recievingUserLog);
};

module.exports = giveGold;
