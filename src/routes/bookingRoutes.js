const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

const { validateBookingInput } = require('../middlewares/validate'); 

router.post('/bookings', validateBookingInput, bookingController.createBooking);

router.get('/bookings', bookingController.getBookings);

module.exports = router;