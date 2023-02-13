const {
	externalRepoSelectMenu,
	externalGitHubUserConnectSelectMenu,
	externalRepoDeleteSelectMenu,
	externalQuestLogSelect,
} = require("../../homeTab");
const {
	findAllAvailableQuests,
	findAllActiveQuestsPerUser,
	findAllActiveQuests,
} = require("../../helperFuncs");
const router = require("express").Router();
//path is api/selectMenus
router.post("/", async (req, res, next) => {
	const parsedSubmission = JSON.parse(req.body.payload);
	const menuSubmission = {
		adminAddReposSubmit: externalRepoSelectMenu,
		adminGitConnectUserSubmit: externalGitHubUserConnectSelectMenu,
		adminDeleteReposSubmit: externalRepoDeleteSelectMenu,
	};
	const questMenuSubmission = {
		viewQuestsSubmit: findAllAvailableQuests,
		questLogSubmit: findAllActiveQuestsPerUser,
		assignQuestCompleteSubmit: findAllActiveQuests,
	};
	const inputSubmitted = parsedSubmission.view.callback_id;
	if (Object.keys(menuSubmission).includes(inputSubmitted)) {
		res
			.send(await menuSubmission[inputSubmitted](parsedSubmission))
			.status(200);
	}
	if (Object.keys(questMenuSubmission).includes(inputSubmitted)) {
		const quests = await questMenuSubmission[inputSubmitted](parsedSubmission);
		res.send(await externalQuestLogSelect(quests, parsedSubmission));
	}
});
module.exports = router;
