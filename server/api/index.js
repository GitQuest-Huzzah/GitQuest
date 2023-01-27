const router = require("express").Router();


router.use("/commands", require("./commands.js"));

router.use("/slack/install", require('./install'));



module.exports = router;

