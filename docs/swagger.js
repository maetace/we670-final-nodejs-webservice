// เรียกใช้งาน swagger-jsdoc เพื่อสร้าง spec ของ OpenAPI จาก comment ที่ฝังในโค้ด
const swaggerJsdoc = require('swagger-jsdoc');

// เรียกใช้งาน swagger-ui-express เพื่อให้ Express แสดงเอกสารผ่านเว็บ
const swaggerUi = require('swagger-ui-express');

// กำหนดตัวเลือก (options) สำหรับ swagger-jsdoc
const options = {
    definition: {
        openapi: '3.0.0', // ระบุเวอร์ชันของ OpenAPI ที่ใช้ (ต้องใช้ 'openapi' ไม่ใช่ 'swagger')
        info: {
            title: 'Thunderbolts* API',          // ชื่อของ API ที่แสดงในหน้าเอกสาร
            version: '1.0.0',                    // เวอร์ชันของ API
            description: 'RESTful API สำหรับจัดการข้อมูลผู้ใช้ในทีม Thunderbolts', // คำอธิบายของ API
        },
        servers: [
            {
                url: 'http://localhost:8000',     // base URL สำหรับ API บนเครื่อง local
                description: 'Local server',      // คำอธิบายของ server นี้
            },
        ],
    },
    apis: ['./routes/*.js'], // ระบุ path ของไฟล์ที่ต้องการให้ swagger-jsdoc สแกนหา comment แบบ OpenAPI
};

// สร้างเอกสารสเปก OpenAPI จาก options ที่กำหนดไว้
const specs = swaggerJsdoc(options);

// ส่งออกทั้ง swaggerUi (middleware) และ specs (สเปกของ API)
module.exports = { swaggerUi, specs };