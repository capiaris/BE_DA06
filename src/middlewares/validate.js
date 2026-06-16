const validateBookingInput = (req, res, next) => {
    const { name, phoneNumber, requestedTime } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ error: "Tên người đặt không được để trống" });
    }

    if (!phoneNumber || !phoneNumber.trim()) {
        return res.status(400).json({ error: "Số điện thoại không được để trống" });
    }

    // Kiểm tra định dạng số điện thoại Việt Nam cơ bản (9-11 chữ số)
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
        return res.status(400).json({ error: "Số điện thoại không đúng định dạng" });
    }

    if (!requestedTime) {
        return res.status(400).json({ error: "Thời gian đặt lịch là bắt buộc" });
    }

    // Kiểm tra xem chuỗi thời gian gửi lên có hợp lệ hay không
    if (isNaN(Date.parse(requestedTime))) {
        return res.status(400).json({ error: "Định dạng thời gian requestedTime không hợp lệ" });
    }

    next();
};

module.exports = {
    validateBookingInput
};