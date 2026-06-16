const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên người đặt là bắt buộc'],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, 'Số điện thoại là bắt buộc'],
        trim: true
    },
    requestedTime: {
        type: Date,
        required: [true, 'Thời gian đặt lịch là bắt buộc']
    }
}, {
    timestamps: true
});

// Khởi tạo index để tối ưu hiệu năng đếm số lượng bản ghi theo khung giờ
bookingSchema.index({ requestedTime: 1 });

module.exports = mongoose.model('Booking', bookingSchema);