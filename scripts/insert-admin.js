const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/users');

dotenv.config();

async function insertAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('[MongoDB] Connected.');

        const adminUser = new User({
            uid: 'U000',
            username: 'admin',
            password: 'P@ssw0rd',
            email: 'admin@thunderbolts.org',
            mobile: '+66123456000',
            avatar: '/images/avatars/default.jpg',
            fullname: 'System Admin',
            birthday: new Date('2000-01-01'),
            gender: 'male',
            role: 'admin',
            status: 'active'
        });

        await adminUser.save();
        console.log('[Insert] Admin user created.');
        process.exit(0);
    } catch (err) {
        console.error('[Insert Error]', err);
        process.exit(1);
    }
}

insertAdmin();