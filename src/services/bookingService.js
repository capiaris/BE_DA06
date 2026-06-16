const Booking = require('../models/Booking');
const timeHelper = require('../utils/timeHelper');

const MAX_CITIZENS_PER_SLOT = 3;
const MIN_HOURS_ADVANCE = 2;
const MAX_DAYS_ADVANCE = 7;

const validateBookingRules = (requestedTimeStr) => {
    const now = new Date();
    const requestedTime = new Date(requestedTimeStr);

    if (requestedTime <= now) return false;

    const hoursDiff = timeHelper.getHoursDifference(requestedTime, now);
    if (hoursDiff < MIN_HOURS_ADVANCE) return false;

    const daysDiff = timeHelper.getDaysDifference(requestedTime, now);
    if (daysDiff > MAX_DAYS_ADVANCE) return false;

    if (!timeHelper.isValidPrioritySlot(requestedTime)) return false;

    return true;
};

const checkSlotAvailability = async (requestedTimeStr) => {
    const requestedTime = new Date(requestedTimeStr);
    
    const currentBookingsCount = await Booking.countDocuments({
        requestedTime: requestedTime
    });
    
    return currentBookingsCount < MAX_CITIZENS_PER_SLOT;
};

const createNewBooking = async (bookingData) => {
    const booking = new Booking({
        name: bookingData.name.trim(),
        phoneNumber: bookingData.phoneNumber.trim(),
        requestedTime: new Date(bookingData.requestedTime)
    });
    return await booking.save();
};

module.exports = {
    validateBookingRules,
    checkSlotAvailability,
    createNewBooking
};