// เรียกใช้ Express และสร้าง Router object
const express = require('express');
const router = express.Router();

// เรียกใช้งาน Mongoose Model ที่เราสร้างไว้
const User = require('../models/users');

// GET /
router.get('/', async (req, res) => {
    try {
        // ดึงข้อมูลผู้ใช้ทั้งหมดจาก MongoDB แบบ lean เพื่อให้ส่งไปใช้ใน EJS ได้ง่าย
        const users = await User.find().lean();

        // ส่งข้อมูล users ไปที่ views/main.ejs เพื่อแสดงในหน้าเว็บ
        res.render('main', { users });
    } catch (err) {
        // กรณีเกิดข้อผิดพลาดในการดึงข้อมูลจาก MongoDB
        console.error('[MongoDB Error]', err.message);
        res.status(500).send('เกิดข้อผิดพลาดในการโหลดผู้ใช้');
    }
});

// ส่งออก router เพื่อให้ app.js สามารถเรียกใช้ได้
module.exports = router;