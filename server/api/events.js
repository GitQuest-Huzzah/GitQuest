const router = require("express").Router();

//path is api/events
//this is listening to subscribed events on the workspace
router.post("/", (req, res, next) => {
    console.log(req.body);
    res.send({code : "HTTP 200", challenge : req.body.challenge});
});

module.exports = router;
