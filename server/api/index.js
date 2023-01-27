const router = require("express").Router();


router.use("/commands", require("./commands.js"));

router.use("/install", require('./install'));



module.exports = router;

