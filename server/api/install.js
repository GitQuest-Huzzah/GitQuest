const { slackInstallAuth } = require("../slackFuncs/commands");

const router = require("express").Router();

// const installer = new InstallProvider({
// 	clientId: "***REMOVED***",
// 	clientSecret: "***REMOVED***",
// 	// stateSecret: "bobbyBIsGoingToGetBusy",
// });

//path is /api/slack/install
router.get("/", async (req, res, next) => {
	res.status(200).send('<h1>Git Going Bot Installed!!</h1>')

});
//path is /api/slack/install/redirect
router.get("/redirect", (req,res) =>{
    slackInstallAuth(req);
	res.redirect([200], "/")
});

module.exports = router;
