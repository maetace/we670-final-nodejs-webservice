const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/users');
const mockUsers = require('../mock-users');

dotenv.config();

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('[MongoDB] Connected.');

        // เคลียร์ข้อมูลเก่าก่อน
        await User.deleteMany({});
        console.log('[Seed] Users cleared.');

        // insert mock
        await User.insertMany(mockUsers);
        console.log('[Seed] Users inserted successfully.');

        process.exit(0);
    } catch (err) {
        console.error('[Seed Error]', err.message);
        process.exit(1);
    }
}

seed();