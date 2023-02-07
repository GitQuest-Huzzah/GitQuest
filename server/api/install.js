const { slackInstallAuth } = require("../slackFuncs");

const router = require("express").Router();

//path is /api/slack/install/redirect
router.get("/redirect", (req,res) =>{
    slackInstallAuth(req);
	res.status(200).redirect('https://gitquest.fun/faq')
});

module.exports = router;
