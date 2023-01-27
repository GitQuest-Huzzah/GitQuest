const router = require("express").Router();
const Bots = require("../db/models/Bots");
const gitWorkFlow = require('../slackFuncs/commands')

router.post("/", (req,res,next)=> {
    res.sendStatus(200)
    
})
router.post("/git", (req,res,next)=> {
    res.sendStatus(200)
    console.log("this is the route being hit")
    gitWorkFlow(req.body)
})

router.post("/test", (req,res,next)=>{
    res.sendStatus(200)
    console.log("will it work");
    Bots.create({
        token: "Token123",
        teamID: "teamID123",
        teamName: "teamName123"
    }) 
})

module.exports = router;
