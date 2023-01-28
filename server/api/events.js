const router = require("express").Router();

router.post("/", (req, res, next) => {
    console.log(req.body);
    res.send({code : "HTTP 200", challenge : req.body.challenge});
});

module.exports = router;
