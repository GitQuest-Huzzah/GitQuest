const { WebClient } = require("@slack/web-api");
const web = new WebClient();
const { Workspace, Quest } = require("../../server/db");
const findTokenByTeamId = require("../queryFuncs/findTokenByTeamId");
const addNewQuest = async (reqBody) => {
	const {
		view: {
			state: {
				values: { name, keyword, description, expValue, goldValue },
			},
		},
	} = reqBody;
	const qName = name.nameAction.value;
	const qKeyword = keyword.keywordAction.value;
	const qDescription = description.descriptionAction.value;
	const qExpValue = expValue.expValueAction.value;
	const qGoldValue = goldValue.goldValueAction.value;

	if (qKeyword.split(" ").length > 1) {
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
	const workspace = await Workspace.findOne({
		where: {
			teamID: reqBody.user.team_id,
		},
	});

	const quest = await Quest.create({
		name: qName,
		keyword: qKeyword,
		description: qDescription,
		expValue: qExpValue,
		goldValue: qGoldValue,
	});
	workspace.addQuest(quest);
};

module.exports = addNewQuest;
