const Booking = require('../models/Booking');

const countByRequestedTime = async (requestedTime) => {
    return await Booking.countDocuments({ requestedTime });
};

const createBooking = async (bookingData) => {
    const booking = new Booking(bookingData);
    return await booking.save();
};

const getBookingsByDateRange = async (start, end) => {
    return await Booking.find({
        requestedTime: {
            $gte: start,
            $lte: end
        }
    }).sort({ requestedTime: 1 });
};

module.exports = {
    countByRequestedTime,
    createBooking,
    getBookingsByDateRange
};