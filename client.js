const axios = require('axios')
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// initialize httpClient
const httpClient = axios.create();

// initiate http POST request to /api/sensor endpoint
const postSensorData = async (data) => {
    const res = await httpClient.post(`http://localhost:${process.env.PORT}/api/sensor`, data);
    return res.data;
};

// Function to generate random sensor data
const generateSensorData = async () => {
    try {
        const data = {
            timestamp: new Date(), // current time
            location: `Location${Math.floor(Math.random() * 3) + 1}`, // random location
            temperature_celsius: (Math.random() * 15) + 20, // random temperature between 20 and 35
            humidity_percent: Math.floor(Math.random() * 100), // random humidity
            pressure_hpa: Math.floor(Math.random() * 50) + 970 // random pressure between 970 and 1020
        };
        const resData = await postSensorData(data);
        return resData
    } catch (error) {
        throw error
    }
}

module.exports = generateSensorData;