// 🔹 เรียกใช้ module ที่จำเป็น
const express = require('express');                   // Framework สำหรับสร้าง Web Application
const usersRouter = require('./routes/users');        // Router แยกสำหรับ API /api/users
const indexRouter = require('./routes/index');        // Router แยกสำหรับหน้า EJS หลัก
const logger = require('./middleware/logger');        // Middleware สำหรับ log request
const mongoose = require('mongoose');                 // ODM สำหรับเชื่อม MongoDB แบบ Object-oriented
const dotenv = require('dotenv');                     // โหลดค่าตัวแปรจากไฟล์ .env
const path = require('path');                         // จัดการ path สำหรับไฟล์และโฟลเดอร์

// 🔹 โหลดค่าตัวแปรสภาพแวดล้อม เช่น MONGO_URI
dotenv.config();

// 🔹 สร้าง Express App
const app = express();
const port = process.env.PORT || 8000; // ถ้าไม่เจอใน .env จะ fallback เป็น 8000

// 🔹 Serve ไฟล์ static (เช่นภาพ, CSS, JS) จาก public/
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 ตั้งค่า View Engine เป็น EJS
app.set('views', path.join(__dirname, 'views'));     // ชี้ไปที่โฟลเดอร์ views
app.set('view engine', 'ejs');                       // ใช้ EJS สำหรับ render HTML

// 🔹 Middleware
app.use(express.json());                             // แปลง JSON body (เช่น POST body) เป็น object
app.use(express.urlencoded({ extended: false }));    // แปลงฟอร์มแบบ application/x-www-form-urlencoded
app.use(logger);                                     // Middleware logger ที่เราสร้างเอง

// 🔹 เส้นทาง Route
app.use('/', indexRouter);                           // สำหรับหน้าเว็บ (render main.ejs)
app.use('/api/users', usersRouter);                  // สำหรับ API แบบ RESTful

// 🔹 เชื่อมต่อ MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('[MongoDB] Connected successfully');

        // 🔹 เริ่มต้น Web Server (เฉพาะเมื่อ DB เชื่อมสำเร็จ)
        app.listen(port, '127.0.0.1', () => {
            console.log(`Listening to request on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('[MongoDB] Connection failed:', err.message);
    });