const express = require('express');
const router = express.Router();
const User = require('../models/users'); // ✅ เชื่อมกับโมเดลผู้ใช้ใน MongoDB

/**
 * GET /api/users
 * คืนค่าผู้ใช้ทั้งหมดจากฐานข้อมูล MongoDB
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // ดึง users ทั้งหมด
        res.json(users);
    } catch (err) {
        console.error('[GET /api/users] Error:', err.message);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' });
    }
});

/**
 * GET /api/users/:uid
 * คืนค่าข้อมูลผู้ใช้ตาม uid (custom id)
 */
router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
        const user = await User.findOne({ uid }); // ค้นจาก uid (ไม่ใช่ _id)

        if (!user) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ระบุ' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'ไม่สามารถค้นหาผู้ใช้ได้' });
    }
});

/**
 * POST /api/users
 * เพิ่มผู้ใช้ใหม่ลงฐานข้อมูล
 */
router.post('/', async (req, res) => {
    const { uid, username, email, avatar } = req.body;

    if (!uid || !username || !email || !avatar) {
        return res.status(400).json({ message: 'กรุณาระบุ uid, username, email และ avatar' });
    }

    try {
        const existing = await User.findOne({ uid });

        if (existing) {
            return res.status(409).json({ message: 'UID นี้ถูกใช้ไปแล้ว' });
        }

        const newUser = new User({
            uid,
            username,
            email,
            avatar,
            status: 'active',
            role: 'member',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'ไม่สามารถเพิ่มผู้ใช้ได้' });
    }
});

/**
 * PUT /api/users/:uid
 * อัปเดตข้อมูลผู้ใช้ตาม uid
 */
router.put('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const { username, email, avatar } = req.body;

    if (!username || !email || !avatar) {
        return res.status(400).json({ message: 'กรุณาระบุ username, email และ avatar' });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { uid },
            { username, email, avatar, updatedAt: new Date() },
            { new: true } // คืนค่าใหม่หลังอัปเดต
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการอัปเดต' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้' });
    }
});

/**
 * DELETE /api/users/:uid
 * ลบผู้ใช้จากฐานข้อมูลตาม uid
 */
router.delete('/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
        const deleted = await User.findOneAndDelete({ uid });

        if (!deleted) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการลบ' });
        }

        res.json({ message: 'ลบผู้ใช้สำเร็จ', user: deleted });
    } catch (err) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบผู้ใช้' });
    }
});

module.exports = router;