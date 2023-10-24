require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const sensorRoutes = require('./routes/sensorRoutes');
const connectDB = require('./config/db');
const handleError = require('./middleware/errorMiddleware');
const loggerMiddleware = require('./middleware/loggerMiddleware');

const generateSensorData = require('./client');

const server = express();

// connect to db
connectDB();

server.use(express.json());

// logger middleware
server.use(loggerMiddleware);

// routes
server.use('/api/sensor', sensorRoutes);

// Error handling middleware
server.use(handleError);

// Scheduled task for sensor data simulation
// This cron job is set to run every 10 seconds
// cron.schedule('*/10 * * * * *', async () => {
//     console.log('Generating simulated sensor data...');
//     try {
//         // Create new sensor data
//         const newSensorData = await generateSensorData();
//         console.log('Simulated data inserted:', newSensorData);
//     }
//     catch (error) {
//         console.error('Error inserting simulated data:', error);
//     }
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});