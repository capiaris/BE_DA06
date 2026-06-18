const fs = require('fs');
const path = require('path');

let offensiveWords = [];

const loadDictionary = () => {
    try {
        // Trỏ đúng tên 2 file bạn tải về từ GitHub
        const file1Path = path.join(__dirname, '../dictionaries/vn_offensive_words.txt');
        const file2Path = path.join(__dirname, '../dictionaries/vn_offensive_words_other_formats.txt');

        // Đọc dữ liệu từ file cục bộ
        const file1Content = fs.readFileSync(file1Path, 'utf8');
        const file2Content = fs.readFileSync(file2Path, 'utf8');

        // Tách dòng và gộp chung 2 danh sách
        const allWords = [
            ...file1Content.split('\n'),
            ...file2Content.split('\n')
        ];

        // Chuẩn hóa: xóa khoảng trắng 2 đầu, đưa về chữ thường và bỏ dòng trống
        offensiveWords = allWords
            .map(word => word.trim().toLowerCase())
            .filter(word => word.length > 0);

        console.log(`[Hệ thống] Đã nạp thành công ${offensiveWords.length} từ khóa nhạy cảm vào bộ nhớ.`);
    } catch (error) {
        console.error("[Lỗi] Không thể đọc file từ điển:", error.message);
    }
};

// Gọi ngay lập tức khi file này được import
loadDictionary();

const containsOffensiveWord = (text) => {
    if (!text || offensiveWords.length === 0) return false;
    
    const normalizedText = text.toLowerCase();

    return offensiveWords.some(word => {
        // Thoát các ký tự đặc biệt có trong từ điển (như *, ., ?) để Regex không bị lỗi
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Chỉ bắt khi từ đó đứng độc lập hoặc cách nhau bởi dấu cách, ngăn chặn việc bắt nhầm tên thật
        const regex = new RegExp(`(?:^|\\s)${escapedWord}(?:\\s|$)`, 'i');
        return regex.test(normalizedText);
    });
};

module.exports = {
    containsOffensiveWord
};