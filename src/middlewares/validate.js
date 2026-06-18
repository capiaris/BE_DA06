const { containsOffensiveWord } = require('../utils/profanityHelper');

const validateBookingInput = (req, res, next) => {
    const { name, phoneNumber, requestedTime } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ error: "Tên người đặt không được để trống" });
    }

    if (containsOffensiveWord(name.trim())) {
        return res.status(400).json({ error: "Tên người đặt chứa từ ngữ không phù hợp. Vui lòng nhập tên hợp lệ." });
    }

    if (!phoneNumber || !phoneNumber.trim()) {
        return res.status(400).json({ error: "Số điện thoại không được để trống" });
    }

    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
        return res.status(400).json({ error: "Số điện thoại không đúng định dạng" });
    }

    // 4. Kiểm tra thời gian
    if (!requestedTime) {
        return res.status(400).json({ error: "Thời gian đặt lịch là bắt buộc" });
    }

    if (isNaN(Date.parse(requestedTime))) {
        return res.status(400).json({ error: "Định dạng thời gian requestedTime không hợp lệ" });
    }

    next();
};

module.exports = {
    validateBookingInput
};