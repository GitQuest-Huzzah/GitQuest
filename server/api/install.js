const { slackInstallAuth } = require("../slackFuncs");

const router = require("express").Router();

//path is /api/slack/install/redirect
router.get("/redirect", (req,res) =>{
    const installed = slackInstallAuth(req);
    installed ? res.status(200).redirect('https://gitquest.fun/faq?installed=successful') : res.status(400).redirect('https://gitquest.fun/faq?installed=failed')
});

module.exports = router;