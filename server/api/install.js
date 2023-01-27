const { slackInstallAuth } = require("../slackFuncs/commands");

const router = require("express").Router();

// const installer = new InstallProvider({
// 	clientId: "4706667577361.4706675007441",
// 	clientSecret: "9bfcc36a2b43abce2e9dfc6b108cbb24",
// 	// stateSecret: "bobbyBIsGoingToGetBusy",
// });

//path is /api/slack/install
router.get("/", async (req, res, next) => {
	// await installer.handleInstallPath(req, res, {
	// 	scopes: [
	// 		"channels:join",
	// 		"channel:read",
	// 		"chat:write",
	// 		"chat:write.public",
	// 		"commands",
	// 		"groups:read",
	// 		"im:read",
	// 		"im:write",
	// 		"incoming-webhook",
	// 		"links:read",
	// 		"links:write",
	// 		"team:read",
	// 		"users:read",
	// 		"users:read.email",
	// 		"users:write",
	// 	],
    //     userScopes:['identity.email'],
    //     redirectUri:"https://gitgoingslackbot.uc.r.appspot.com/api/slack/install/redirect"
	// });
	res.sendStatus(200);
	// console.log(req.query, "route was hit query logged");
	// slackInstallAuth(req);
});
//path is /api/slack/install/redirect
router.get("/redirect", (req,res) =>{
    // installer.handleCallback(req,res)
    slackInstallAuth(req);
});

module.exports = router;
