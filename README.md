# **เอกสารประกอบ : โครงงาน node.js & WebService (30 คะแนน)**


1. ## **ผู้จัดทำ**

| ชื่อนักศึกษา: | เมธี นิลรัตน์ |
| :---- | :---- |
| รหัสนักศึกษา: | 67130893 |
| วิชา: | WE670 - การพัฒนาเว็บแอปพลิเคชันขั้นสูง |
| วันที่ส่ง: | 05/06/2025 |


2. ## **ใบงาน**

| อาจาร์ผู้สอน: | WINYU NIRANATLAMPHONG |
| :---- | :---- |
| วันที่สั่งงาน: | 18/05/2025 |
| กำหนดส่งงาน: | 20/06/2025 11:59 PM |
| คะแนน: | 30 คะแนน |

    งาน -:  ให้ นศ.จัดทำโครงงานขนาดเล็กๆ คล้ายกับ Food Project ในชีท Week06
    •  อนุญาตให้ทำเป็นกลุ่มละ 1-2 คนได้ (ไม่เกิน 2 คนต่อกลุ่ม)
    •  ให้ นศ.ออกแบบโครงงานติดต่อกับฐานข้อมูลเพื่อจัดเก็บข้อมูล และติดต่อด้วย API
    •  จัดทำ Environment ด้วย node.js
    •  ให้มี API สามารถ GET, Delete, POST, PUT ได้เป็นอย่างน้อย
    •  ให้ นศ.สร้างโฟลเดอร์โครงงานเป็น เลขทะเบียนนักศึกษา ของ นศ.เอง และใส่โค้ดและโน้ตการ set ค่าทุกอย่างลงในโฟลเดอร์นี้

     
    สิ่งที่ต้องส่ง -:
    •  ให้ นศ. บีบอัดโฟลเดอร์งานข้างต้น ส่ง ขอให้ตั้งชื่อไฟล์เป็น Project-เลขทะเบียนนักศึกษา.zip ครับ
    •  พิมพ์เอกสารประกอบโครงงาน (อธิบายส่วนต่างๆ คล้ายกับในชีท Week06 ในส่วนของโค้ด API ต่างๆ และอาจจะ capture หน้าจอใส่ประกอบได้ครับ ไฟล์เอกสารที่ส่งขอให้เป็นไฟล์ .docx หรือ .pdf ครับ
    •  ส่งภายใน 20 มิถุนายน 2568 ในกระทู้นี้


3. ## **แนะนำโครงการ**

    โครงงานนี้เป็นส่วนหนึ่งของวิชา WE670 การพัฒนาเว็บแอปพลิเคชันขั้นสูง (Part 1: Node.js) โดยมีวัตถุประสงค์เพื่อฝึกการสร้าง RESTful API ด้วย Node.js และ Express พร้อมเชื่อมต่อฐานข้อมูล MongoDB บน MongoDB Atlas  

    ระบบที่พัฒนาคือ Thunderbolts Directory\* ซึ่งแสดงรายชื่อสมาชิกของทีม Thunderbolts พร้อมข้อมูลส่วนตัว เช่น ชื่อผู้ใช้ อีเมล เบอร์โทร รูปภาพ วันเกิด สถานะ และบทบาทผู้ใช้งาน   

    โดยระบบสามารถให้บริการ API แบบเต็มรูปแบบ ได้แก่การเรียกดู เพิ่ม แก้ไข และลบข้อมูล (GET, POST, PUT, DELETE) ผ่านโครงสร้าง RESTful อย่างครบถ้วน   
    พร้อมเชื่อมต่อฐานข้อมูลจริงผ่าน Mongoose และ MongoDB Atlas โดยมีการแสดงผลหน้าเว็บไซต์ด้วย EJS template ที่ดึงข้อมูลจากฐานจริงมาแสดงแบบ dynamic รองรับการปรับขยายในอนาคตได้ง่าย   

    ระบบถูกออกแบบให้มีการแยกส่วนการทำงาน เช่น routes, models, middleware และ view อย่างเป็นระบบ พร้อม middleware สำหรับบันทึก log การใช้งานในรูปแบบ timestamp ทำให้โครงงานนี้สามารถประยุกต์ใช้ได้จริงในระดับ production เบื้องต้น  


4. # **การติดตั้งแพ็กเกจทั้งหมดที่ใช้งานจริงในโครงงาน** 

    Initial Project Setup:    
        •  npm init --yes
    Framework & Core:  
        •  npm i express --save  
    Development Tools:  
        •  npm i nodemon -g --save-dev  
        •  npm i dotenv  
    Database:  
        •  npm i mongoose  
    Middleware:  
        •  npm i body-parser  
    View Template:  
        •  npm i ejs  
    API Documentation:  
        •  npm i swagger-ui-express  
        •  npm i swagger-jsdoc  


5. **เตรียม Environment**  

    •  วางโครงสร้างโฟลเดอร์และไฟล์สำหรับโปรเจกต์

```
we670-final-nodejs-webservice
.
├── docs
│   └── swagger.js
├── middleware
│   └── logger.js
├── mock
│   ├── mock-data-script.js
│   └── mock-data.js
├── models
│   └── users.js
├── public
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
├── views
│   └── main.ejs
├── .env
├── app.js
├── package-lock.json
├── package.json
└── README.md
```

    •  ปรับปรุง pagekage.json
        •  ตรวจสอบ dependencies ที่ติดตั้ง
        •  ปรับปรุง scripts สำหรับ start และ seed ข้อมูล

```js
{
 "name": "we670-final-nodejs-webservice",
 "version": "1.0.0",
 "main": "index.js",
 "scripts": {
   "start": "nodemon app.js",
   "seed": "node mock/mock-data-script.js",
   "test": "echo \"Error: no test specified\" && exit 1"
 },
 "keywords": [],
 "author": "",
 "license": "ISC",
 "description": "",
 "dependencies": {
   "body-parser": "^2.2.0",
   "ejs": "^3.1.10",
   "express": "^5.1.0",
   "mongodb": "^6.16.0",
   "mongoose": "^8.15.1",
   "dotenv": "^16.5.0",
   "swagger-jsdoc": "^6.2.8",
   "swagger-ui-express": "^5.0.1",
   "yamljs": "^0.3.0"
 },
 "devDependencies": {
   "nodemon": "^3.1.10"
 }
}
```


6. # **การเชื่อมต่อฐานข้อมูล MongoDB Atlas**

    •  สมัคร MongoDB Atlas  
    •  https://www.mongodb.com/cloud/atlas และทำการสมัครสมาชิก  
    •  สร้าง Project: we670-final-nodejs-webservice  
    •  สร้าง Cluster: we670-final-nodejs-webservice (แบบ Free Tier)

[![Screenshot-2568-06-03-at-14-42-25.png](https://i.postimg.cc/wB8Bq6v4/Screenshot-2568-06-03-at-14-42-25.png)](https://postimg.cc/Jsx8KCjj)

    •  ตั้งค่า .env และการเชื่อมต่อผ่าน mongoose

```js
MONGO_URI=mongodb+srv://we670:Dpuwe2025@we670-final-nodejs-webs.difeyf9.mongodb.net/thunderbolts?retryWrites=true&w=majority&appName=we670-final-nodejs-webservice
```


7. # **โครงสร้างฐานข้อมูล และ Seed ข้อมูลเข้าสู่ MongoDB**

    •  models/users.js พร้อมคำอธิบาย Schema

```js
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
   uid: String,
   username: String,
   password: String,
   email: String,
   mobile: String,
   avatar: String,
   fullname: String,
   birthday: Date,
   gender: {
       type: String,
       enum: ['male', 'female', 'other'],
       default: 'other'
   },
   status: {
       type: String,
       enum: ['active', 'inactive', 'pending', 'deleted', 'banned'],
       default: 'active'
   },
   role: {
       type: String,
       enum: ['admin', 'member'],
       default: 'member'
   }
}, {
   timestamps: true
});


module.exports = mongoose.model('User', userSchema);
```

    •  การสร้าง mock/mock-data  
  	    •  ตัวอย่างข้อมูลจำลองของผู้ใช้ Thunderbolts จำนวน 10 ราย 
   	    •  ถูกจัดเก็บในรูปแบบ Array เพื่อเตรียม seed เข้าฐานข้อมูล

```js
const users = [
   {
       uid: 'U001',
       username: 'yelena',
       password: 'P@sswor0d',
       email: 'yelena.b@thunderbolts.org',
       mobile: '+66123456001',
       avatar: 'https://i.postimg.cc/hP5p4gfx/yelena.jpg',
       fullname: 'Yelena Belova',
       birthday: new Date('1989-06-15'),
       gender: 'female',
       status: 'active',
       role: 'member'
   },
   {
       uid: 'U002',
...
```

    •  การสร้าง mock/mock-data-script.js

```js
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
```

    •  Seed ข้อมูลเข้าสู่ MongoDB ด้วยคำสั่ง
        •  npm run seed ที่ Terminal

```
m@Ms-MacBook-Pro we670-final-nodejs-webservice % npm run seed
> we670-final-nodejs-webservice@1.0.0 seed
> node scripts/seed-data.js


(node:3944) [MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
(Use `node --trace-warnings ...` to show where the warning was created)
(node:3944) [MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
[MongoDB] Connected.
[Seed] Users cleared.
[Seed] Users inserted successfully.
```


8. # **การสร้าง Middleware**

    ในโปรเจกต์นี้ได้มีการสร้าง middleware ชื่อ logger.js ซึ่งอยู่ในโฟลเดอร์ middleware/ เพื่อทำหน้าที่บันทึกข้อมูลของ HTTP Request ที่เข้ามาทุกครั้ง โดยข้อมูลที่ถูก log จะประกอบด้วย HTTP Method, URL ที่เรียกใช้งาน และ timestamp ขณะนั้น ตัวอย่างของโค้ด และผลลัพธ์ที่ได้แสดงไว้ด้านล่าง  
    •  middleware/logger.js 

```js
// สร้าง middleware logger สำหรับบันทึกการร้องขอ (HTTP Request)

const logger = (req, res, next) => {
   // สร้าง timestamp ปัจจุบันในรูปแบบ ISO8601 (ตัวอย่าง: 2025-06-02T15:30:00.000Z)
   const now = new Date().toISOString();

   // แสดงข้อมูล log ของคำขอ HTTP เช่น [Logger] GET /api/users 2025-06-02T15:30:00.000Z
   console.log(`[Logger] ${req.method} ${req.url} ${now}`);

   // เรียกใช้ middleware ถัดไป หรือ route handler ถัดไป
   next();
};

// ส่งออก middleware นี้ให้ไฟล์อื่นใช้งานได้ เช่น app.js
module.exports = logger;
```

    •  ตัวอย่าง log ผลลัพธ์ที่ได้

```
[Logger] GET / 2025-06-02T07:52:34.911Z
[Logger] GET /api/users 2025-06-02T07:52:44.491Z
[Logger] GET /api/users/U005 2025-06-02T07:52:54.176Z
[Logger] POST /api/users 2025-06-02T07:53:04.961Z
[Logger] PUT /api/users/U011 2025-06-02T07:54:45.917Z
[Logger] DELETE /api/users/U011 2025-06-02T07:55:56.750Z
```


9. # **การตั้งค่าและทำงานของ app.js**

```js
// 1. Core Modules & Config
const path = require('path'); // ใช้สำหรับจัดการ path ของไฟล์/โฟลเดอร์
const dotenv = require('dotenv'); // ใช้โหลดค่าตัวแปรสภาพแวดล้อมจากไฟล์ .env
dotenv.config(); // เรียกใช้ทันทีเพื่อให้ process.env ใช้ได้ในทุกส่วน

// 2. 3rd-party Modules
const express = require('express'); // Framework หลักสำหรับสร้าง Web Server
const mongoose = require('mongoose'); // ODM สำหรับเชื่อมต่อและจัดการ MongoDB
const swaggerUi = require('swagger-ui-express'); // Middleware สำหรับแสดง Swagger UI

// 3. Custom Modules (เขียนขึ้นเอง)
const logger = require('./middleware/logger'); // Middleware สำหรับแสดง log ของ request
const usersRouter = require('./routes/users'); // ไฟล์ route สำหรับ API /api/users
const indexRouter = require('./routes/index'); // ไฟล์ route สำหรับหน้าเว็บหลัก
const { specs } = require('./docs/swagger'); // เอกสาร Swagger (รูปแบบ OpenAPI)

// 4. App Initialization
const app = express(); // สร้าง instance ของ express
const port = process.env.PORT || 8000; // ใช้ PORT จาก .env หรือ fallback เป็น 8000

// 5. Middleware
app.use(express.static(path.join(__dirname, 'public'))); // ให้ Express เสิร์ฟไฟล์ static จาก public/
app.use(express.json()); // แปลง JSON ใน request body เป็น object
app.use(express.urlencoded({ extended: false })); // แปลง form-urlencoded เป็น object
app.use(logger); // ใช้ middleware logger ที่เขียนเอง

// 6. View Engine
app.set('views', path.join(__dirname, 'views')); // ตั้งค่าโฟลเดอร์ที่เก็บไฟล์ .ejs
app.set('view engine', 'ejs'); // ใช้ EJS เป็น template engine

// 7. Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs)); // เส้นทางสำหรับ Swagger UI
app.use('/', indexRouter); // หน้าเว็บหลัก (render EJS)
app.use('/api/users', usersRouter); // API สำหรับจัดการผู้ใช้ (RESTful)

// 8. Database Connection & App Start
mongoose.connect(process.env.MONGO_URI) // เชื่อมต่อกับ MongoDB ด้วย URI จาก .env
   .then(() => {
       console.log('[MongoDB] Connected successfully'); // เมื่อเชื่อมต่อสำเร็จ แสดงข้อความยืนยัน
       app.listen(port, () => { // เริ่ม Web Server บนพอร์ตที่กำหนด
           console.log(`Listening to request on port ${port}`);
       });
   })
   .catch((err) => {
       console.error('[MongoDB] Connection failed:', err.message); // หากเชื่อมต่อไม่สำเร็จ แสดง error
   });
```

10. # **การสร้าง API Routes**

    •  สร้าง routes/users.js

```js
// เรียกใช้ express และสร้าง router แยกสำหรับ route /api/users
const express = require('express');
const router = express.Router();

// เรียกใช้โมเดล User จาก Mongoose เพื่อใช้เชื่อมกับฐานข้อมูล MongoDB
const User = require('../models/users');
```

    •  GET /api/users — เรียกดูผู้ใช้ทั้งหมด

```js
router.get('/', async (req, res) => {
   try {
       const users = await User.find();
       res.json(users);
   } catch (err) {
       console.error('[GET /api/users] Error:', err.message);
       res.status(500).json({ message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' });
   }
});
```

    •  GET /api/users/:uid — เรียกดูผู้ใช้เฉพาะคน

```js
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
```

    •  POST /api/users — เพิ่มผู้ใช้ใหม่

```js
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
```

    •  PUT /api/users/:uid — แก้ไขข้อมูลผู้ใช้

```js
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
```

    •  DELETE /api/users/:uid — ลบผู้ใช้

```js
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
```

    •  ส่ง router ออกไปให้ app.js ใช้งาน

```js
module.exports = router;
```


11. # **การทดสอบ API ด้วย Postman**

    •  ทดสอบ การดึงข้อมูลผู้ใช้ทั้งหมด  
    •  Method: GET  
    •  URL: http://localhost:8000/api/users  
        •  ผลการทดสอบ บน Postman  

[![Screenshot-2568-06-03-at-14-43-38.png](https://i.postimg.cc/sgZXCBVZ/Screenshot-2568-06-03-at-14-43-38.png)](https://postimg.cc/HrdHQk8p) 

    •  ทดสอบ การดึงข้อมูลผู้ใช้รายคน  
        •  Method: GET  
        •  URL: http://localhost:8000/api/users/U007  
        •  ผลการทดสอบ บน Postman  

[![Screenshot-2568-06-03-at-14-44-00.png](https://i.postimg.cc/RVYFY1zB/Screenshot-2568-06-03-at-14-44-00.png)](https://postimg.cc/ZCr4BdR7)
      
    •  ทดสอบ การเพิ่มผู้ใช้ใหม่  
        •  Method: POST  
    	•  URL: http://localhost:8000/api/users  
    	•  Body \> JSON:

| {   "username": "newuser",   "email": "newuser@thunderbolts.org",   "avatar": "/images/avatars/default.jpg" } |
| :---- |
 
    	•  ผลการทดสอบ บน Postman

[![Screenshot-2568-06-03-at-14-53-10.png](https://i.postimg.cc/PxdrD21m/Screenshot-2568-06-03-at-14-53-10.png)](https://postimg.cc/R3bB51sF)

    •  ทดสอบ การแก้ไขข้อมูลผู้ใช้
        •  Method: PUT
    	•  URL: http://localhost:8000/api/users/U011
    	•  Body \> JSON:

| {   "username": "justme",   "email": "justme@thunderbolts.org",   "avatar": "/images/avatars/justme.jpg" } |
| :---- |

    	•  ผลการทดสอบ บน Postman

[![Screenshot-2568-06-03-at-14-54-48.png](https://i.postimg.cc/fyLz2y2y/Screenshot-2568-06-03-at-14-54-48.png)](https://postimg.cc/ygMCW1zC)

    •  ทดสอบ การลบข้อมูลผู้ใช้
    	•  Method: DELETE
    	•  URL: http://localhost:8000/api/users/U011
        •  ผลการทดสอบ บน Postman

[![Screenshot-2568-06-03-at-14-55-37.png](https://i.postimg.cc/hv5SHn6r/Screenshot-2568-06-03-at-14-55-37.png)](https://postimg.cc/wRD8mC6y)
  

12. # **การแสดงผลหน้า Web ด้วย EJS Template**

    •  สร้าง views/main.ejs

```html
<!DOCTYPE html>
<html lang="th">

<head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>Thunderbolts* Directory</title>
   <link rel="stylesheet" href="/stylesheets/style.css" />
</head>

<body>
   <header>
       <h1>Thunderbolts*</h1>
   </header>

   <main class="container">
       <ul class="users">
           <% users.forEach(function(data) { %>
               <li class="user">
                   <img src="<%= data.avatar %>" class="user-avatar" alt="Avatar of <%= data.fullname %>" />
                   <div class="user-fullname">
                       <%= data.fullname %> (<%= data.username %>)
                   </div>
                   <div class="user-email">
                       Email: <%= data.email %>
                   </div>
               </li>
               <% }); %>
       </ul>
   </main>
</body>

</html>
```

    •  เสริมความสวยงามด้วย public/stylesheets/style.css เช่น

```css
body {
   font-family: 'Roboto', 'Segoe UI', sans-serif;
   font-size: 16px;
   background-color: #f5f5f5;
   margin: 0;
   padding: 30px;
}

h1 {
   font-size: 2em;
   margin-bottom: 30px;
   color: #222;
   text-align: center;
}

.container {
   max-width: 1200px;
   margin: 0 auto;
}
...
```

    •  ตัวอย่างการแสดงผลที่หน้าเบราว์เซอร์

[![Screenshot-2568-06-03-at-08-13-48.png](https://i.postimg.cc/436xnrHf/Screenshot-2568-06-03-at-08-13-48.png)](https://postimg.cc/1gzQj7K2)


13. # **การจัดทำเอกสาร API ด้วย Swagger**

   ในการพัฒนา RESTful API โครงงานนี้ได้นำ Swagger (OpenAPI) มาใช้สร้างเอกสาร API แบบอัตโนมัติผ่านเส้นทาง /api-docs อย่างเป็นระบบตามมาตรฐาน OpenAPI 3.0

   •  docs/swagger.js

```js
// เรียกใช้งาน swagger-jsdoc เพื่อสร้าง spec ของ OpenAPI จาก comment ที่ฝังในโค้ด
const swaggerJsdoc = require('swagger-jsdoc');


// เรียกใช้งาน swagger-ui-express เพื่อให้ Express แสดงเอกสารผ่านเว็บ
const swaggerUi = require('swagger-ui-express');


// กำหนดตัวเลือก (options) สำหรับ swagger-jsdoc
const options = {
   definition: {
       openapi: '3.0.0', // ระบุเวอร์ชันของ OpenAPI ที่ใช้
       info: {
           title: 'Thunderbolts* API', // ชื่อของ API ที่แสดงในหน้าเอกสาร
           version: '1.0.0',  // เวอร์ชันของ API
           description: 'RESTful API สำหรับจัดการข้อมูลผู้ใช้ในทีม Thunderbolts', 
       },
       servers: [
           {
               url: 'http://localhost:8000', 
               description: 'Local server',
           },
       ],
   },
   apis: ['./routes/*.js'], // ระบุ path ของไฟล์ที่ต้องการให้ swagger-jsdoc สแกนหา comment แบบ OpenAPI
};


// สร้างเอกสารสเปก OpenAPI จาก options ที่กำหนดไว้
const specs = swaggerJsdoc(options);


// ส่งออกทั้ง swaggerUi (middleware) และ specs (สเปกของ API)
module.exports = { swaggerUi, specs };
```

   •  routes/users.js เพิ่ม block comment ที่ขึ้นต้นด้วย @swagger หรือ @openapi บนแต่ละ route เช่น GET, POST, PUT, DELETE ตามมาตรฐาน OpenAPI 3.0 ตัวอย่างเช่น

```js
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
```

14. # **สรุปผลและการต่อยอด**

    จากการพัฒนาโครงงาน we670-final-nodejs-webservice ผู้จัดทำได้เรียนรู้การออกแบบและพัฒนาเว็บเซอร์วิสโดยใช้ Node.js ร่วมกับ Express.js ตั้งแต่ขั้นตอนการติดตั้ง การกำหนดโครงสร้างโปรเจกต์ การใช้งาน middleware การสร้าง API routes และการเชื่อมต่อกับฐานข้อมูล MongoDB Atlas ผ่าน Mongoose โดยครอบคลุมทั้งกระบวนการ seed ข้อมูลแบบ mock และการจัดการข้อมูลผู้ใช้ในรูปแบบ RESTful API อย่างสมบูรณ์  
    
    นอกจากนี้ยังได้ฝึกใช้เครื่องมือ Express Generator, Postman และ EJS เพื่อแสดงผลข้อมูลแบบไดนามิกบนฝั่ง Client อย่างเป็นระบบ พร้อมทั้งฝึกแนวทางการเขียนโค้ดให้มีความ modular และ maintainable ซึ่งจะเป็นพื้นฐานสำคัญสำหรับการพัฒนาแอปพลิเคชันระดับจริงในอนาคต  
      
    แนวทางการต่อยอด ที่สามารถพัฒนาต่อจากโครงงานนี้ ได้แก่:  
        •  เพิ่มระบบ Authentication / Authorization เช่น JWT หรือ OAuth2 เพื่อจำกัดสิทธิ์ในการเข้าถึง API  
        •  สร้าง ระบบ Login และ Register สำหรับผู้ใช้ทั่วไป  
        •  เพิ่ม Admin Panel สำหรับจัดการผู้ใช้ผ่าน Web UI  
        •  ใช้งาน MongoDB Aggregation เพื่อสร้าง report หรือ dashboard  
        •  เชื่อมต่อกับ Frontend Framework เช่น React หรือ Next.js เพื่อพัฒนาให้เป็น Full-stack Application  


15. # **การเชื่อมโยงกับวิชาอื่นและการต่อยอดแบบบูรณาการ**

    ในการพัฒนาโครงงานนี้ ผู้จัดทำได้นำความรู้จากวิชาอื่นภายในหลักสูตรมาใช้ร่วมด้วย โดยเฉพาะจากวิชา WE564 การบริหารจัดการโครงการซอฟต์แวร์สมัยใหม่ ซึ่งได้เรียนรู้แนวคิดและเครื่องมือในกระบวนการ DevOps ผู้จัดทำได้นำ API ที่พัฒนาด้วย Node.js ไปจัดการ Deploy บน GitHub และ Render.io เพื่อให้สามารถนำไปเชื่อมต่อกับระบบ Front-end ได้ทันที  
    
    การเตรียมพร้อมดังกล่าวมีเป้าหมายเพื่อเชื่อมต่อกับโครงงานในวิชา WE670 การพัฒนาเว็บแอปพลิเคชันขั้นสูง Part ที่ 2 (Next.js) ที่จะพัฒนา Front-end ให้สมบูรณ์แบบเป็น Full-stack Web Application และยังสามารถเชื่อมต่อกับแอปพลิเคชันบนอุปกรณ์พกพาที่พัฒนาด้วย Flutter ในวิชา WE563 ได้อย่างไร้รอยต่อ  
    
    แนวคิด Single Source of Truth จึงถูกนำมาใช้ โดยมี Node.js API เป็นแกนกลางในการจัดเก็บและแลกเปลี่ยนข้อมูลระหว่างระบบทั้งหมด ซึ่งช่วยให้เกิดความยืดหยุ่นในการพัฒนา แบ่งงาน และต่อยอดในระยะยาว
