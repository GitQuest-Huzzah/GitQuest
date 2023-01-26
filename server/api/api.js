const writeFileToBucket = require("./logging");

const router = require("express").Router();

router.get("/", (req,res,next)=> {
    res.json({helloWorld: "hello world"})
    writeFileToBucket(req)
})

module.exports = router;