const bookingRepository = require('../repositories/bookingRepository');
const timeHelper = require('../utils/timeHelper');

const MAX_CITIZENS_PER_SLOT = 3;
const MIN_HOURS_ADVANCE = 2;
const MAX_DAYS_ADVANCE = 7;

const processNewBooking = async (bookingData) => {
    const { name, phoneNumber, requestedTime } = bookingData;
    
    if (!name || !phoneNumber || !requestedTime) {
        throw new Error("Thiếu thông tin bắt buộc");
    }

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
        throw new Error("Số điện thoại không đúng định dạng");
    }

    const reqTime = new Date(requestedTime);
    if (isNaN(reqTime.getTime())) {
        throw new Error("Định dạng thời gian không hợp lệ");
    }

    const now = new Date();
    if (reqTime <= now) {
         throw new Error("Thời gian đặt lịch phải ở tương lai");
    }

    const hoursDiff = timeHelper.getHoursDifference(reqTime, now);
    if (hoursDiff < MIN_HOURS_ADVANCE) {
        throw new Error("Phải đặt trước tối thiểu 2 giờ");
    }

    const daysDiff = timeHelper.getDaysDifference(reqTime, now);
    if (daysDiff > MAX_DAYS_ADVANCE) {
        throw new Error("Chỉ được đặt trước tối đa 7 ngày");
    }

    if (!timeHelper.isValidPrioritySlot(reqTime)) {
        throw new Error("Chỉ hỗ trợ khung giờ :00 hoặc :30");
    }

    const currentBookingsCount = await bookingRepository.countByRequestedTime(reqTime);
    if (currentBookingsCount >= MAX_CITIZENS_PER_SLOT) {
        throw new Error("Khung giờ ưu tiên này đã đầy");
    }

    return await bookingRepository.createBooking({
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        requestedTime: reqTime
    });
};

const getBookingsByDate = async (dateStr) => {
    if (!dateStr || isNaN(Date.parse(dateStr))) {
        throw new Error("Tham số 'date' không hợp lệ");
    }

    const startOfDay = new Date(dateStr);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(dateStr);
    endOfDay.setHours(23, 59, 59, 999);

    return await bookingRepository.getBookingsByDateRange(startOfDay, endOfDay);
};

module.exports = {
    processNewBooking,
    getBookingsByDate
};