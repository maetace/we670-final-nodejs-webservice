// 1. Core Modules & Config
const path = require('path');                      // ใช้สำหรับจัดการ path ของไฟล์/โฟลเดอร์
const dotenv = require('dotenv');                  // ใช้โหลดค่าตัวแปรสภาพแวดล้อมจากไฟล์ .env
dotenv.config();                                   // เรียกใช้ทันทีเพื่อให้ process.env ใช้ได้ในทุกส่วน

// 2. 3rd-party Modules
const express = require('express');                // Framework หลักสำหรับสร้าง Web Server
const mongoose = require('mongoose');              // ODM สำหรับเชื่อมต่อและจัดการ MongoDB
const swaggerUi = require('swagger-ui-express');   // Middleware สำหรับแสดง Swagger UI

// 3. Custom Modules (เขียนขึ้นเอง)
const logger = require('./middleware/logger');     // Middleware สำหรับแสดง log ของ request
const usersRouter = require('./routes/users');     // ไฟล์ route สำหรับ API /api/users
const indexRouter = require('./routes/index');     // ไฟล์ route สำหรับหน้าเว็บหลัก
const { specs } = require('./docs/swagger'); // เอกสาร Swagger (รูปแบบ OpenAPI)

// 4. App Initialization
const app = express();                             // สร้าง instance ของ express
const port = process.env.PORT || 8000;             // ใช้ PORT จาก .env หรือ fallback เป็น 8000

// 5. Middleware
app.use(express.static(path.join(__dirname, 'public'))); // ให้ Express เสิร์ฟไฟล์ static จาก public/
app.use(express.json());                                 // แปลง JSON ใน request body เป็น object
app.use(express.urlencoded({ extended: false }));        // แปลง form-urlencoded เป็น object
app.use(logger);                                         // ใช้ middleware logger ที่เขียนเอง

// 6. View Engine
app.set('views', path.join(__dirname, 'views'));         // ตั้งค่าโฟลเดอร์ที่เก็บไฟล์ .ejs
app.set('view engine', 'ejs');                           // ใช้ EJS เป็น template engine

// 7. Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // เส้นทางสำหรับ Swagger UI
app.use('/', indexRouter);                               // หน้าเว็บหลัก (render EJS)
app.use('/api/users', usersRouter);                      // API สำหรับจัดการผู้ใช้ (RESTful)

// 8. Database Connection & App Start
mongoose.connect(process.env.MONGO_URI)                  // เชื่อมต่อกับ MongoDB ด้วย URI จาก .env
    .then(() => {
        console.log('[MongoDB] Connected successfully');     // เมื่อเชื่อมต่อสำเร็จ แสดงข้อความยืนยัน
        app.listen(port, () => {                             // เริ่ม Web Server บนพอร์ตที่กำหนด
            console.log(`Listening to request on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('[MongoDB] Connection failed:', err.message); // หากเชื่อมต่อไม่สำเร็จ แสดง error
    });