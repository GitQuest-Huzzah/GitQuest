const { slackInstallAuth } = require("../slackFuncs/commands");

const router = require("express").Router();

//path is /api/slack/install
router.get("/", async (req, res, next) => {
	res.sendStatus(200)

});
//path is /api/slack/install/redirect
router.get("/redirect", (req,res) =>{
	console.log(req, "redirect slack route getting hit")
    slackInstallAuth(req);
	res.status(200).redirect("chrome://dino/")
});

module.exports = router;
