const router = require("express").Router();
const fs = require("fs");
const updateUserOnPR = require('../webhookFuncs/updateUserOnPR')

//path is /api/webhook
router.post("/", (req, res) => {
	//req.body.repository.organization
	//req.body.repository.name
	//req.body.repository.full_name
	//req.body.ref  is the HEAD of the push ie main, corbin/branchName
	//req.body.action === "closed"
	// fs.appendFileSync(
	// 	"eventJSON.json",
	// 	`______________EVENT MESSAGE START ${Buffer.from(
	// 		JSON.stringify(req.body)
	// 	)} EVENT MESSAGE END___________________`
	// );
    res.status(204)
    // console.log(req.body)
    
    if(req.body.action === 'closed' && req.body.pull_request.merged === true){
    // console.log(req.body.sender.id, req.body.pull_request.commits, req.body.organization.login)
        updateUserOnPR(req.body)
    }
});

module.exports = router;
