const router = require("express").Router();
const {homeTab} = require("../slackFuncs/commands")

//path is api/events
//this is listening to subscribed events on the workspace
router.post("/", (req, res, next) => {
    // console.log("hi ther")
    // console.log(req.body.event);
    // console.log("event fired")
    if(req.body.event.type === "app_home_opened") return homeTab(req.body)
    // console.log(JSON.parse(req.body.payload))
    // const parsedSubmission = JSON.parse(req.body.payload)
    // console.log(parsedSubmission.view.state.values.RepoName.Repo_Name_Input.value)
    // const truthyObject = parsedSubmission.view.state.values
    // const checking = Object.keys(truthyObject)
    // console.log(parsedSubmission)
    res.sendStatus(200)
});  
    // res.send({code : "HTTP 200", challenge : req.body.challenge});

module.exports = router;
