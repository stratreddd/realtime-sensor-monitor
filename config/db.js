const mongoose = require('mongoose');
const logger = require('../config/winston-config');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('MongoDB connected...');
    } catch (err) {
        logger.error('Database connection error', err);
        process.exit(1);
    }
};

module.exports = connectDB;