const { slackInstallAuth } = require("../slackFuncs/commands");

const router = require("express").Router();

router.get("/", (req,res,next)=> {
    res.sendStatus(200)
    console.log(req.query,"route was hit query logged")
    slackInstallAuth(req)
})


module.exports = router;
