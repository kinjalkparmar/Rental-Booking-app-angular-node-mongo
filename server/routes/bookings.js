const express = require('express');
const router = express.Router();

const userctrl = require('../controllers/user');
const Bookingctrl = require('../controllers/booking');


router.post('',userctrl.authMiddleware, Bookingctrl.createBooking)

module.exports = router;