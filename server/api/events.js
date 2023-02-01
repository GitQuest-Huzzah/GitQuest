const router = require("express").Router();
const {homeTab} = require("../slackFuncs/commands")

//path is api/events
//this is listening to subscribed events on the workspace
router.post("/", (req, res, next) => {
    // res.send({code : "HTTP 200", challenge : req.body.challenge});
    console.log(req.body)
    if(req.body.event.type === "app_home_opened") return homeTab(req.body)
    res.sendStatus(200)
});  

module.exports = router;
