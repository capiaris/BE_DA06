const bookingService = require('../services/bookingService');

const createBooking = async (req, res) => {
    try {
        const newBooking = await bookingService.processNewBooking(req.body);
        return res.status(201).json({
            message: "Đặt lịch thành công",
            data: newBooking
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const data = await bookingService.getBookingsByDate(req.query.date);
        return res.status(200).json({
            success: true,
            results: data.length,
            data: data
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookings
};