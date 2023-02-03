const router = require("express").Router();
const fs = require("fs");
const updateUserOnPR = require('../webhookFuncs/updateUserOnPR')

//path is /api/webhook
router.post("/", (req, res) => {
    res.status(204)
    // console.log(req.body)
    
    if(req.body.action === 'closed' && req.body.pull_request.merged === true){
    // console.log(req.body.sender.id, req.body.pull_request.commits, req.body.organization.login)
        updateUserOnPR(req.body)
    }
});

module.exports = router;
