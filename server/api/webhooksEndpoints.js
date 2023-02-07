const router = require("express").Router();
const fs = require("fs");
const updateUserOnPR = require("../webhookFuncs/updateUserOnPR");
const addPRIDToQuest = require("../webhookFuncs/addPRIDToQuest");
const updateQuestsOnPR = require("../webhookFuncs/updateQuestsOnPR");

//path is /api/webhook
router.post("/", (req, res) => {
    res.status(204);

    if (req.body.action === "opened") {
        console.log(req.body, "THIS IS OPENED BRUH");
        addPRIDToQuest(req.body);
    }
    if (req.body.action === "closed" && req.body.pull_request.merged === true) {
        console.log(req.body.pull_request, "closed PR")
        updateUserOnPR(req.body);
        updateQuestsOnPR(req.body);
    }
});

module.exports = router;
