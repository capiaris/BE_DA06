const fs = require('fs');
const path = require('path');

let offensiveWords = [];

const loadDictionary = () => {
    try {
        const file1Path = path.join(__dirname, '../dictionaries/vn_offensive_words.txt');
        const file2Path = path.join(__dirname, '../dictionaries/vn_offensive_words_other_formats.txt');

        const file1Content = fs.readFileSync(file1Path, 'utf8');
        const file2Content = fs.readFileSync(file2Path, 'utf8');

        // 1. XỬ LÝ FILE 1: Cắt theo dòng, bỏ qua dòng trống và dòng comment bắt đầu bằng #
        const list1 = file1Content.split(/\r?\n/)
            .map(w => w.trim().toLowerCase())
            .filter(w => w.length > 0 && !w.startsWith('#'));

        // 2. XỬ LÝ FILE 2: Dùng Regex "bế" tất cả các từ nằm trong dấu nháy đơn '...'
        const list2 = [];
        const regex = /'([^']+)'/g; 
        let match;
        while ((match = regex.exec(file2Content)) !== null) {
            const word = match[1].trim().toLowerCase();
            if (word) list2.push(word);
        }

        // 3. Gộp 2 danh sách lại và dùng Set để xóa các từ bị trùng lặp
        offensiveWords = [...new Set([...list1, ...list2])];

        console.log(`[Hệ thống] Đã phân tích và nạp thành công ${offensiveWords.length} từ khóa cấm.`);
    } catch (error) {
        console.error("[Lỗi] Không thể đọc file từ điển:", error.message);
    }
};

loadDictionary();

const containsOffensiveWord = (text) => {
    if (!text || offensiveWords.length === 0) return false;
    
    // Loại bỏ dấu câu cơ bản nếu khách vô tình nhập, sau đó bọc 2 đầu bằng khoảng trắng
    const cleanText = text.replace(/[.,!?]/g, '').toLowerCase();
    const normalizedText = ` ${cleanText} `;

    // Kiểm tra xem có từ cấm nào xuất hiện độc lập trong chuỗi không
    const foundWord = offensiveWords.find(word => {
        // Bọc từ cấm bằng khoảng trắng để so sánh chính xác tuyệt đối
        // Cách này giúp chữ "cu" không bắt nhầm chữ "Cung" của tên thật
        return normalizedText.includes(` ${word} `);
    });

    if (foundWord) {
        console.log(`[BỘ LỌC] Đã chặn tên: "${text}" vì dính từ: "${foundWord}"`);
        return true;
    }

    return false;
};

module.exports = {
    containsOffensiveWord
};