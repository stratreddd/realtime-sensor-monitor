const express = require('express');
// const { body } = require('express-validator');
const Sensor = require('../models/sensor')
const validateRules = require('../middleware/validatorMiddleware');
const router = express.Router();

const sensorValidationRules = [];

// Create sensor data
router.post('/', sensorValidationRules, validateRules, async (req, res, next) => {

    try {
        const sensor = new Sensor(req.body);
        const createdSensorData = await sensor.save();
        res.status(201).json(createdSensorData);
    } catch (error) {
        next(error);
    }
});


module.exports = router;