const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { validateBookingInput } = require('../middlewares/validate');

router.post('/bookings', validateBookingInput, bookingController.createBooking);

module.exports = router;