const router = require("express").Router();


router.use("/commands", require("./commands.js"));

router.use("/slack/install", require('./install'));

router.use('/github/', require('./github'));


module.exports = router;

