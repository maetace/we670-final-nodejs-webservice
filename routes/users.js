// เรียกใช้ express และสร้าง router แยกสำหรับ route /api/users
const express = require('express');
const router = express.Router();

// เรียกใช้โมเดล User จาก Mongoose เพื่อใช้เชื่อมกับฐานข้อมูล MongoDB
const User = require('../models/users');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: ดึงข้อมูลผู้ใช้ทั้งหมด หรือกรองตาม query เช่น role, status, gender, username
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: กรองผู้ใช้ตาม role
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: กรองผู้ใช้ตามสถานะ
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *         description: กรองผู้ใช้ตามเพศ
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: ค้นหา username แบบบางส่วน ไม่สนตัวพิมพ์เล็กใหญ่
 *     responses:
 *       200:
 *         description: ส่งข้อมูลผู้ใช้ตามเงื่อนไขที่ระบุ หรือทั้งหมดถ้าไม่มีเงื่อนไข
 */
router.get('/', async (req, res) => {
    // เตรียม object สำหรับกรองข้อมูล
    const filter = {};

    // ตรวจสอบและเพิ่มเงื่อนไขจาก query string ถ้ามี
    if (req.query.role) filter.role = req.query.role;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.gender) filter.gender = req.query.gender;
    if (req.query.username) filter.username = { $regex: req.query.username, $options: 'i' };

    try {
        const users = await User.find(filter); // ใช้ filter แทน find ทั้งหมด
        res.json(users);
    } catch (err) {
        console.error('[GET /api/users] Error:', err.message);
        res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' });
    }
});

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: ดึงข้อมูลผู้ใช้ตาม uid
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: uid ของผู้ใช้ที่ต้องการค้นหา
 *     responses:
 *       200:
 *         description: ส่งข้อมูลผู้ใช้ที่พบ
 *       404:
 *         description: ไม่พบผู้ใช้
 */
router.get('/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ระบุ' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'ไม่สามารถค้นหาผู้ใช้ได้' });
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: เพิ่มผู้ใช้ใหม่
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email]
 *             properties:
 *               uid:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: ผู้ใช้ถูกเพิ่มสำเร็จ
 *       409:
 *         description: UID ซ้ำ
 *       400:
 *         description: ข้อมูลไม่ครบถ้วน
 */
router.post('/', async (req, res) => {
    let {
        uid,
        username,
        email,
        avatar,
        role = 'member',
        status = 'active'
    } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: 'กรุณาระบุ username และ email' });
    }

    if (!avatar) {
        avatar = 'https://i.postimg.cc/QM56nPN7/default.jpg';
    }

    try {
        if (!uid) {
            const lastUser = await User.findOne().sort({ uid: -1 }).exec();
            if (lastUser && /^U\d{3}$/.test(lastUser.uid)) {
                const currentNumber = parseInt(lastUser.uid.substring(1), 10);
                uid = `U${(currentNumber + 1).toString().padStart(3, '0')}`;
            } else {
                uid = 'U001';
            }
        }

        const existing = await User.findOne({ uid });
        if (existing) {
            return res.status(409).json({ message: 'UID นี้ถูกใช้ไปแล้ว' });
        }

        const newUser = new User({
            uid,
            username,
            email,
            avatar,
            role,
            status,
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
 * @swagger
 * /api/users/{uid}:
 *   put:
 *     summary: อัปเดตข้อมูลผู้ใช้ตาม uid
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: uid ของผู้ใช้ที่ต้องการอัปเดต
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: ข้อมูลผู้ใช้ถูกอัปเดตแล้ว
 *       404:
 *         description: ไม่พบผู้ใช้
 *       400:
 *         description: ข้อมูลไม่ครบ
 */
router.put('/:uid', async (req, res) => {
    const uid = req.params.uid;
    const updateFields = req.body;

    if (!uid || Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'กรุณาระบุ uid และอย่างน้อยหนึ่งฟิลด์ที่ต้องการอัปเดต' });
    }

    try {
        updateFields.updatedAt = new Date();

        const updatedUser = await User.findOneAndUpdate(
            { uid },
            updateFields,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้ที่ต้องการอัปเดต' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error('[PUT /api/users/:uid] Error:', err.message);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตผู้ใช้' });
    }
});

/**
 * @swagger
 * /api/users/{uid}:
 *   delete:
 *     summary: ลบผู้ใช้ตาม uid
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: uid ของผู้ใช้ที่ต้องการลบ
 *     responses:
 *       200:
 *         description: ลบผู้ใช้สำเร็จ
 *       404:
 *         description: ไม่พบผู้ใช้
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

// ส่ง router ออกไปให้ app.js ใช้งาน
module.exports = router;