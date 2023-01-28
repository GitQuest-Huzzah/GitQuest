const router = require("express").Router();

const {gitWorkFlow, blockTest, bangedMom} = require('../slackFuncs/commands')


router.post("/", (req,res,next)=> {
    res.sendStatus(200)
    
})
router.post("/git", (req,res,next)=> {
    res.sendStatus(200)
    console.log("/git route being hit", req.body)
    gitWorkFlow(req.body)
})
router.post("/mom", (req,res,next)=> {
    res.sendStatus(200)
    console.log("/mom route being hit", req.body)
    bangedMom(req.body)
})

router.post("/block", (req,res,next)=> {
    res.sendStatus(200)
    console.log("/block route being hit", req.body)
    blockTest(req.body)
})

module.exports = router;
