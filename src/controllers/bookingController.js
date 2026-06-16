const bookingService = require('../services/bookingService');

const createBooking = async (req, res) => {
    try {
        const { name, phoneNumber, requestedTime } = req.body;

        // 1. Kiểm tra các quy tắc về thời gian (Tối thiểu 2h, tối đa 7 ngày, đúng khung giờ :00 hoặc :30)
        const isValidRule = bookingService.validateBookingRules(requestedTime);
        if (!isValidRule) {
            return res.status(400).json({ error: "Thời gian đặt lịch không thỏa mãn các điều kiện ràng buộc" });
        }

        // 2. Kiểm tra giới hạn số lượng (Tối đa 3 người mỗi khung giờ)
        const isAvailable = await bookingService.checkSlotAvailability(requestedTime);
        if (!isAvailable) {
            return res.status(400).json({ error: "Khung giờ ưu tiên này đã đầy (tối đa 3 người)" });
        }

        // 3. Thực hiện lưu thông tin vào database
        const newBooking = await bookingService.createNewBooking({ name, phoneNumber, requestedTime });

        return res.status(201).json({ 
            message: "Đặt lịch thành công", 
            data: newBooking 
        });
    } catch (error) {
        return res.status(500).json({ error: "Lỗi hệ thống nội bộ: " + error.message });
    }
};

module.exports = {
    createBooking
};