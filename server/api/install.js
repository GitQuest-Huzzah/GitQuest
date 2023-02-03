const { slackInstallAuth } = require("../slackFuncs");

const router = require("express").Router();

//path is /api/slack/install/redirect
router.get("/redirect", (req,res) =>{
    console.log(req,"redirect")
    slackInstallAuth(req);
	res.status(200).json({installed:"yes"})
});

module.exports = router;
