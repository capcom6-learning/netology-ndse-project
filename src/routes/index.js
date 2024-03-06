const router = require("express").Router();

router.use("/", require("./auth"));
router.use("/advertisements", require("./advertisements"));

module.exports = router;