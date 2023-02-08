const router = require("express").Router();
const fs = require("fs");
const updateUserOnPR = require("../webhookFuncs/updateUserOnPR");
const addPRIDToQuest = require("../webhookFuncs/addPRIDToQuest");
const updateQuestsOnPR = require("../webhookFuncs/updateQuestsOnPR");

//path is /api/webhook
router.post("/", (req, res) => {
    res.status(204);

    if (req.body.action === "opened") {
        addPRIDToQuest(req.body);
    }
    if (req.body.action === "closed" && req.body.pull_request.merged === true) {
        updateUserOnPR(req.body);
        updateQuestsOnPR(req.body);
    }
});

module.exports = router;
