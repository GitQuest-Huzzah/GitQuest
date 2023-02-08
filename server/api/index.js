const router = require("express").Router();
//routes for different endpoints
router.use("/interactivity", require("./interactivity.js"));

router.use("/events", require("./events.js"));

router.use("/slack/install", require('./install'));

router.use('/github/', require('./github'));

router.use('/webhook', require('./webhooksEndpoints'));

router.use('/selectMenus', require('./selectMenus'))

module.exports = router;

