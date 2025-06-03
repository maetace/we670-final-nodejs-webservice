// เรียกใช้ express และสร้าง router แยกสำหรับ route /api/users
const express = require('express');
const router = express.Router();

// เรียกใช้โมเดล User จาก Mongoose เพื่อใช้เชื่อมกับฐานข้อมูล MongoDB
const User = require('../models/users');

/**
 * GET /api/users
 * ดึงข้อมูลผู้ใช้ทั้งหมดจาก MongoDB และส่งกลับในรูปแบบ JSON
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // ดึงข้อมูลทั้งหมดจาก collection users
        res.json(users); // ส่งผลลัพธ์กลับเป็น JSON
    } catch (err) {
        console.error('[GET /api/users] Error:', err.message);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' });
    }
});

/**
 * GET /api/users/:uid
 * ดึงข้อมูลผู้ใช้จาก MongoDB ตาม uid ที่รับมาจาก path parameter
 */
router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
        const user = await User.findOne({ uid }); // ค้นหาผู้ใช้จากฟิลด์ uid

        if (!user) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ระบุ' });
        }

        res.json(user); // ส่งข้อมูลผู้ใช้กลับ
    } catch (err) {
        res.status(500).json({ message: 'ไม่สามารถค้นหาผู้ใช้ได้' });
    }
});

/**
 * POST /api/users
 * เพิ่มผู้ใช้ใหม่เข้าสู่ฐานข้อมูล MongoDB
 */
router.post('/', async (req, res) => {
    const { uid, username, email, avatar } = req.body;

    // ตรวจสอบข้อมูลที่จำเป็นต้องมี
    if (!uid || !username || !email || !avatar) {
        return res.status(400).json({ message: 'กรุณาระบุ uid, username, email และ avatar' });
    }

    try {
        // ตรวจสอบว่า uid ซ้ำหรือไม่
        const existing = await User.findOne({ uid });

        if (existing) {
            return res.status(409).json({ message: 'UID นี้ถูกใช้ไปแล้ว' });
        }

        // สร้าง instance ใหม่ของ User model
        const newUser = new User({
            uid,
            username,
            email,
            avatar,
            status: 'active',        // กำหนดค่าเริ่มต้น
            role: 'member',          // สมาชิกทั่วไป
            createdAt: new Date(),   // เวลาสร้าง
            updatedAt: new Date()    // เวลาล่าสุด
        });

        await newUser.save(); // บันทึกลง MongoDB
        res.status(201).json(newUser); // ตอบกลับผู้ใช้ที่เพิ่มแล้ว
    } catch (err) {
        res.status(500).json({ message: 'ไม่สามารถเพิ่มผู้ใช้ได้' });
    }
});

/**
 * PUT /api/users/:uid
 * อัปเดตข้อมูลผู้ใช้ในฐานข้อมูล MongoDB ตาม uid ที่รับมา
 */
router.put('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const { username, email, avatar } = req.body;

    // ตรวจสอบข้อมูลที่จำเป็นต้องมี
    if (!username || !email || !avatar) {
        return res.status(400).json({ message: 'กรุณาระบุ username, email และ avatar' });
    }

    try {
        // ค้นหาและอัปเดตข้อมูลผู้ใช้
        const updatedUser = await User.findOneAndUpdate(
            { uid },
            { username, email, avatar, updatedAt: new Date() },
            { new: true } // คืนค่าผลลัพธ์หลังจากอัปเดต
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการอัปเดต' });
        }

        res.json(updatedUser); // ส่งข้อมูลที่อัปเดตกลับ
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้' });
    }
});

/**
 * DELETE /api/users/:uid
 * ลบข้อมูลผู้ใช้ออกจาก MongoDB ตาม uid ที่ระบุ
 */
router.delete('/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
        const deleted = await User.findOneAndDelete({ uid }); // ลบข้อมูล

        if (!deleted) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการลบ' });
        }

        res.json({ message: 'ลบผู้ใช้สำเร็จ', user: deleted }); // ตอบกลับข้อมูลที่ลบแล้ว
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบผู้ใช้' });
    }
});

// ส่ง router ออกไปใช้งานใน app.js
module.exports = router;