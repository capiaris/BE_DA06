require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// Kết nối database toàn cục trước khi lắng nghe request
connectDB();

app.use(express.json());
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});