const router = require("express").Router();

router.use("/commands", require('./commands.js'))

module.exports = router;

