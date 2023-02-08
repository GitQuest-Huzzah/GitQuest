const { homeTab } = require("../../slackHomeTab");
const router = require("express").Router();
//path is api/events
//this is listening to subscribed events on the workspace
router.post("/", (req, res, next) => {
	if (req.body.challenge)
	return res.send({ code: "HTTP 200", challenge: req.body.challenge });
	return res.send({ code: "HTTP 200", challenge: req.body.challenge });
		
	if (req.body.event.type === "app_home_opened") {
		res.sendStatus(200);
		return homeTab(req.body);
	}
});

module.exports = router;
