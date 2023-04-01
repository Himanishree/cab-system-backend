const router = require("express").Router();
const cabController = require("../controllers/cab-controller");

router.post("/api/cab-list", cabController.sendAvailableCab)

module.exports = router;