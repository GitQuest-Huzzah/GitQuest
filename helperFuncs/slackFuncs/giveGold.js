const { WebClient } = require("@slack/web-api");
const { User, Goldlog, Playerstat } = require("../../server/db");
const findTokenByTeamId = require("../queryFuncs/findTokenByTeamId");
const web = new WebClient();

const giveGold = async (reqBody) => {
	const receivingUser = await User.findOne({
		where: {
			slackID:
				reqBody.view.state.values.userSelected.selectedUser.selected_user,
		},
	});

	const sendingUser = await User.findOne({
		where: {
			slackID: reqBody.user.id,
		},
		include:{
			model: Playerstat
		}
	});

	if (
		sendingUser.dataValues.playerstat.dataValues.rewardGold <
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

	if (!receivingUser) {
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
	Playerstat.decrement("rewardGold", {
		by: reqBody.view.state.values.amountGiven.givenAmount.value, where:{
			userId: sendingUser.dataValues.id
		}
	});
	Playerstat.increment("gold", {
		by: reqBody.view.state.values.amountGiven.givenAmount.value, where:{
			userId: receivingUser.dataValues.id
		}
	});
	const receivingUserLog = await Goldlog.create({
		description: "Someone gave you gold!",
		valueChange: `+ ${reqBody.view.state.values.amountGiven.givenAmount.value}`,
	});
	receivingUser.addGoldlog(receivingUserLog);
};

module.exports = giveGold;
