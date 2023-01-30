const router = require("express").Router();

//path is api/interactivity
//all captured data from interactive slack messages hit this endpoint
router.post("/", (req, res, next) => {
    console.log(req.body);
    res.sendStatus(200)
});

module.exports = router;
