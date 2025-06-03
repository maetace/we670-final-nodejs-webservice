// สร้าง middleware logger สำหรับบันทึกการร้องขอ (HTTP Request)

const logger = (req, res, next) => {
    // สร้าง timestamp ปัจจุบันในรูปแบบ ISO8601 (ตัวอย่าง: 2025-06-02T15:30:00.000Z)
    const now = new Date().toISOString();

    // แสดงข้อมูล log ของคำขอ HTTP เช่น [Logger] GET /api/users 2025-06-02T15:30:00.000Z
    console.log(`[Logger] ${req.method} ${req.url} ${now}`);

    // เรียกใช้ middleware ถัดไป หรือ route handler ถัดไป
    next();
};

// ส่งออก middleware นี้ให้ไฟล์อื่นใช้งานได้ เช่น app.js
module.exports = logger;