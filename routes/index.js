const express = require('express');
const router = express.Router();

const users = require('../mock-users');

router.get('/', (req, res) => {
    res.render('main', { users }); // ส่ง users ไปให้ main.ejs
});

module.exports = router;