const router = require("express").Router();


//path is /api/webhook
router.post("/", (req,res) =>{
    console.log(req)
	res.sendStatus(200)
});

module.exports = router;