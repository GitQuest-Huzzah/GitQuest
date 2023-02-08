const {
    externalRepoSelectMenu,
    externalGitHubUserConnectSelectMenu,
    externalRepoDeleteSelectMenu,
    externalQuestLogSelect,
} = require("../externalSelectMenus");
const { findAllAvailableQuests, findAllActiveQuestsPerUser } = require("../slackFuncs");

const router = require("express").Router();

//path is api/selectMenus
router.post("/", async (req, res, next) => {
    const parsedSubmission = JSON.parse(req.body.payload);

    if (parsedSubmission.view.callback_id === "adminAddReposSubmit") {
        res.send(await externalRepoSelectMenu(parsedSubmission)).status(200);
    }
    if (parsedSubmission.view.callback_id === "adminGitConnectUserSubmit") {
        res.send(
            await externalGitHubUserConnectSelectMenu(parsedSubmission)
        ).status(200);
    }
    if (parsedSubmission.view.callback_id === "adminDeleteReposSubmit") {
        res.send(await externalRepoDeleteSelectMenu(parsedSubmission)).status(
            200
        );
    }
    if (parsedSubmission.view.callback_id === "viewQuestsSubmit") {
        const quests = await findAllAvailableQuests(parsedSubmission);
        res.send(await externalQuestLogSelect(quests,parsedSubmission)).status(200);
    }
    if (parsedSubmission.view.callback_id === "questLogSubmit") {
        const quests = await findAllActiveQuestsPerUser(parsedSubmission);
        res.send(await externalQuestLogSelect(quests,parsedSubmission)).status(200);
    }
});

module.exports = router;
