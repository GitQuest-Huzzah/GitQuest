const router = require("express").Router();

router.post("/", (req,res,next)=> {
    res.sendStatus(200)
    
})
router.get("/bots", (req,res,next)=> {
    res.sendStatus(200)
    console.log("this is bot route the route being hit")
})

module.exports = router;
