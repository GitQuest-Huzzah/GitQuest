const { slackInstallAuth } = require("../../apiFuncs/authFuncs");

const router = require("express").Router();

//path is /api/slack/install/redirect
router.get("/redirect", (req,res) =>{
    slackInstallAuth(req);
	res.status(200).json({installed:"yes"})
});

module.exports = router;
