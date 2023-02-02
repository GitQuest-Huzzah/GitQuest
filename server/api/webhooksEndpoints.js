const router = require("express").Router();
const fs = require("fs");

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
    console.log(req.body)
});

module.exports = router;
