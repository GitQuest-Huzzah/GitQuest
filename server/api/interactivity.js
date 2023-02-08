const {
    addAllOrgReposToDB,
    gitHubSetRepoHook,
    updateUserGitHub,
    gitHubDeleteRepo,
} = require("../gitFuncs");

const {
    achievementsModal,
    addQuest,
    addQuestModal,
    adminAssignQuestComplete,
    adminAssignQuestCompleteModal,
    adminOrgModal,
    adminRepoModal,
    adminGitConnectUserModal,
    createOrUpdateOrg,
    giveGold,
    giveGoldModal,
    goldLogModal,
    profileModal,
    questLog,
    questLogModal,
    viewQuests,
    viewQuestsModal,
} = require("../slackFuncs");
const adminDeleteRepoModal = require("../slackFuncs/adminDeleteRepoModal");

const router = require("express").Router();

//path is api/interactivity
//all captured data from interactive slack messages hit this endpoint
router.post("/", (req, res, next) => {
    const parsedSubmission = JSON.parse(req.body.payload);
    // console.log(parsedSubmission, "BUTTON PUSHED")
    if (parsedSubmission.type === "block_actions") {
        if (parsedSubmission.actions[0].action_id === "adminOrgModalButton")
            adminOrgModal(parsedSubmission);
        if (parsedSubmission.actions[0].action_id === "adminRepoModalButton")
            adminRepoModal(parsedSubmission);
        if (
            parsedSubmission.actions[0].action_id ===
            "adminGitConnectUserModalButton"
        )
            adminGitConnectUserModal(parsedSubmission);
        if (
            parsedSubmission.actions[0].action_id ===
            "adminRepoDeleteModalButton"
        )
            adminDeleteRepoModal(parsedSubmission);
        res.sendStatus(200);
        if (parsedSubmission.actions[0].action_id === "goldLogButton")
            goldLogModal(parsedSubmission);
        if (parsedSubmission.actions[0].action_id === "achievementButton")
            achievementsModal(parsedSubmission);
        if (parsedSubmission.actions[0].action_id === "giveGoldButton")
            giveGoldModal(parsedSubmission);
        if (parsedSubmission.actions[0].action_id === "addQuestButton")
            addQuestModal(parsedSubmission);
        if (parsedSubmission.actions[0].action_id === "viewQuestsButton")
            viewQuestsModal(parsedSubmission);
        if (parsedSubmission.actions[0].action_id === "profileButton")
            profileModal(parsedSubmission);
        if (parsedSubmission.actions[0].action_id === "questLogButton")
            questLogModal(parsedSubmission);
        if (parsedSubmission.actions[0].action_id === "assignQuestCompleteButton")
            adminAssignQuestCompleteModal(parsedSubmission);
    }

    if (
        parsedSubmission.view.callback_id === "adminAddReposSubmit" &&
        parsedSubmission.type === "view_submission"
    ) {
        res.send({ response_action: "clear" });
        addAllOrgReposToDB(parsedSubmission);
        gitHubSetRepoHook(parsedSubmission);
    }

    if (
        parsedSubmission.view.callback_id === "adminAddOrgSubmit" &&
        parsedSubmission.type === "view_submission"
    ) {
        res.send({ response_action: "clear" });
        createOrUpdateOrg(parsedSubmission);
    }
    if (
        parsedSubmission.view.callback_id === "adminGitConnectUserSubmit" &&
        parsedSubmission.type === "view_submission"
    ) {
        res.send({ response_action: "clear" });
        updateUserGitHub(parsedSubmission);
    }
    if (
        parsedSubmission.view.callback_id === "adminDeleteReposSubmit" &&
        parsedSubmission.type === "view_submission"
    ) {
        res.send({ response_action: "clear" });
        gitHubDeleteRepo(parsedSubmission);
    }
    if (
        parsedSubmission.view.callback_id === "giveGoldSubmit" &&
        parsedSubmission.type === "view_submission"
    ) {
        res.send({ response_action: "clear" });
        giveGold(parsedSubmission);
    }
    if (
        parsedSubmission.view.callback_id === "addQuestSubmit" &&
        parsedSubmission.type === "view_submission"
    ) {
        res.send({ response_action: "clear" });
        addQuest(parsedSubmission);
    }
    if (
        parsedSubmission.view.callback_id === "viewQuestsSubmit" &&
        parsedSubmission.type === "view_submission"
    ) {
        res.send({ response_action: "clear" });
        viewQuests(parsedSubmission);
    }
    if (
        parsedSubmission.view.callback_id === "questLogSubmit" &&
        parsedSubmission.type === "view_submission"
    ) {
        res.send({ response_action: "clear" });
        questLog(parsedSubmission);
    }
    if (
        parsedSubmission.view.callback_id === "assignQuestCompleteSubmit" &&
        parsedSubmission.type === "view_submission"
    ) {
        res.send({ response_action: "clear" });
        adminAssignQuestComplete(parsedSubmission);
    }
});

module.exports = router;
