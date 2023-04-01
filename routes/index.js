const router = require("express").Router();
const bookingController = require("../controllers/booking-controller");
const cabController = require("../controllers/cab-controller");

router.post("/api/cab-list", cabController.sendAvailableCab)
router.post("/api/add-cab", cabController.addCab);
router.post("/api/book-cab", bookingController.bookCab);

module.exports = router;