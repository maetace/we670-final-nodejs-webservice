const express = require('express');
const router = express.Router();

// Import the users data
const users = require('../mock-users');

// GET /api/users
router.get('/', (req, res) => {
    res.json(users);
});

// GET /api/users/:uid
router.get('/:uid', (req, res) => {
    const uid = req.params.uid;
    const user = users.find(u => u.uid === uid);

    if (!user) {
        return res.status(404).json({ message: 'ไม่พบข้อมูลที่ระบุ' });
    }

    res.json(user);
});

// POST /api/users
router.post('/', (req, res) => {
    const { username, avatar, email } = req.body;

    if (!username || !avatar || !email) {
        return res.status(400).json({ message: 'กรุณาระบุข้อมูล username, avatar และ email ให้ครบถ้วน' });
    }

    const newUser = {
        uid: `U${(users.length + 1).toString().padStart(3, '0')}`,
        username,
        avatar,
        email,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        status: 'active'
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

// PUT /api/users/:uid
router.put('/:uid', (req, res) => {
    const uid = req.params.uid;
    const index = users.findIndex(u => u.uid === uid);

    if (index === -1) {
        return res.status(404).json({ message: 'ไม่พบข้อมูลที่ต้องการแก้ไข' });
    }

    const { username, avatar, email } = req.body;

    if (!username || !avatar || !email) {
        return res.status(400).json({ message: 'กรุณาระบุข้อมูล username, avatar และ email ให้ครบถ้วน' });
    }

    users[index] = {
        ...users[index],
        username,
        avatar,
        email,
        updated: new Date().toISOString()
    };

    res.json(users[index]);
});

// DELETE /api/users/:uid
router.delete('/:uid', (req, res) => {
    const uid = req.params.uid;
    const index = users.findIndex(u => u.uid === uid);

    if (index === -1) {
        return res.status(404).json({ message: 'ไม่พบข้อมูลที่ต้องการลบ' });
    }

    users.splice(index, 1);

    res.json({ message: 'ลบข้อมูลสำเร็จ', users });
});

module.exports = router;