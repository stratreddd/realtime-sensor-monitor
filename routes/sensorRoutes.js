const express = require('express');
const Sensor = require('../models/sensor')
const { validateId, sensorValidationRules, validateRules } = require('../middleware/validatorMiddleware');
const router = express.Router();

// get all sensor data
router.get('/', async (req, res, next) => {
    try {
        const sensorData = await Sensor.find().select('-__v').lean().exec()
        res.status(200).json(sensorData);
    } catch (error) {
        next(error);
    }
});

// get sensor data by id
router.get('/:id', validateId, validateRules, async (req, res, next) => {
    try {
        const sensorData = await Sensor.findById(req.params.id).select('-__v').lean().exec();
        if (!sensorData) {
            return res.status(404).json({ message: 'Sensor data not found' });
        }
        res.status(200).json(sensorData);
    } catch (error) {
        next(error);
    }
});

// create sensor data
router.post('/', sensorValidationRules, validateRules, async (req, res, next) => {
    try {
        const sensor = new Sensor(req.body);
        const createdSensorData = await sensor.save();
        res.status(201).json(createdSensorData);
    } catch (error) {
        next(error);
    }
});

// update sensor data by id
router.put('/:id', validateId, validateRules, async (req, res, next) => {
    try {
        const updatedSensorData = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSensorData) {
            return res.status(404).json({ message: 'Sensor data not found' });
        }
        res.status(200).json(updatedSensorData);
    } catch (error) {
        next(error);
    }
});

// delete sensor by id
router.delete('/:id', validateId, validateRules, async (req, res, next) => {
    try {
        const deletedSensorData = await Sensor.findByIdAndRemove(req.params.id);
        if (!deletedSensorData) {
            return res.status(404).json({ message: 'Sensor data not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;