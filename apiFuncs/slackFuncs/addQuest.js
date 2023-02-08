const { WebClient } = require("@slack/web-api");
const web = new WebClient();
const {Workspaces, Quest} = require("../../server/db");
const findTokenByTeamId = require("./findTokenByTeamId");

const addQuest = async (reqBody) => {
	console.log(reqBody.view.state,"quest add body")
	const name = reqBody.view.state.values.keyword.nameAction.value;
	const keyword = reqBody.view.state.values.keyword.keywordAction.value;
	const description =
		reqBody.view.state.values.description.descriptionAction.value;
	const expValue = reqBody.view.state.values.expValue.expValueAction.value;
	const goldValue = reqBody.view.state.values.goldValue.goldValueAction.value;

	if (keyword.split(" ").length > 1) {
		await web.chat.postMessage({
			blocks: [
				{
					type: "section",
					text: {
						type: "mrkdwn",
						text: "Keyword must be one word. Think of it as a singular name!",
					},
				},
			],
			channel: reqBody.user.id,
			token: await findTokenByTeamId(reqBody.user.team_id),
		});
		return console.log("exiting");
	}
	const workspace = await Workspaces.findOne({
		where: {
			teamID: reqBody.user.team_id,
		},
	});

	const quest = await Quest.create({
		name,
		keyword,
		description,
		expValue,
		goldValue,
	});
	workspace.addQuest(quest);
};

module.exports = addQuest;
