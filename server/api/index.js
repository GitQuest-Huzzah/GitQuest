const router = require("express").Router();

router.use("/bots", require('./bots.js'))
router.use("/commands", require('./commands.js'))

module.exports = router;

