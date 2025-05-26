const express = require("express");
const authMiddleWare = require("../Middleware/authMiddleWare");
const {makePayment, bookShow,getAllBooking } = require("../Contollers/bookingController");
const router =express.Router();

router.post("/make-payment",authMiddleWare,makePayment);
router.post("/book-show",authMiddleWare,bookShow);
router.get("/get-all-bookings",authMiddleWare,getAllBooking);

module.exports = router;