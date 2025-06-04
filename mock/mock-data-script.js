// เรียกใช้ mongoose สำหรับเชื่อมต่อฐานข้อมูล MongoDB
const mongoose = require('mongoose');

// เรียกใช้ dotenv เพื่อโหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env
const dotenv = require('dotenv');

// เรียกใช้ model ที่เราสร้างไว้สำหรับ users
const User = require('../models/users');

// เรียกใช้ mock data ที่เตรียมไว้ ซึ่งต้อง export เป็น array ของ object
const mockUsers = require('./mock-data');

// โหลดค่าจากไฟล์ .env เข้ามาใน process.env
dotenv.config();

// สร้างฟังก์ชัน async สำหรับดำเนินการ seed ข้อมูล
async function seed() {
    try {
        // เชื่อมต่อกับฐานข้อมูล MongoDB ด้วย URI ที่เก็บไว้ในไฟล์ .env
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,            // ตัวเลือกนี้ไม่มีผลแล้วในเวอร์ชันปัจจุบัน
            useUnifiedTopology: true          // ตัวเลือกนี้ไม่มีผลแล้วเช่นกัน
        });

        // แสดงข้อความเมื่อเชื่อมต่อสำเร็จ
        console.log('[MongoDB] Connected.');

        // ลบข้อมูลเก่าทั้งหมดจาก collection User
        await User.deleteMany({});
        console.log('[Seed] Users cleared.');

        // เพิ่มข้อมูล mock users ทั้งหมดลงในฐานข้อมูล
        await User.insertMany(mockUsers);
        console.log('[Seed] Users inserted successfully.');

        // ปิด process ด้วยรหัสสถานะ 0 (แสดงว่าทำงานสำเร็จ)
        process.exit(0);
    } catch (err) {
        // แสดงข้อความ error และปิด process ด้วยรหัสสถานะ 1 (แสดงว่ามีข้อผิดพลาด)
        console.error('[Seed Error]', err.message);
        process.exit(1);
    }
}

// เรียกใช้ฟังก์ชัน seed
seed();