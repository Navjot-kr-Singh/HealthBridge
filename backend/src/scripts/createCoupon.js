const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Coupon = require('../models/Coupon');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const createDummyCoupon = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        const coupon = await Coupon.findOneAndUpdate(
            { code: 'YUV20' },
            {
                code: 'YUV20',
                discountPercentage: 100,
                expirationDate: new Date('2027-12-31'),
                isActive: true
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log(`Coupon ${coupon.code} is ready with ${coupon.discountPercentage}% discount.`);
    } catch (error) {
        console.error('Error creating coupon:', error);
    } finally {
        await mongoose.disconnect();
    }
};

createDummyCoupon();
