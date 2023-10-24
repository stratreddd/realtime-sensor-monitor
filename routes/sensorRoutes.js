const express = require('express');
const Sensor = require('../models/sensor')
const { validateId, sensorValidationRules, validateRules } = require('../middleware/validatorMiddleware');
const router = express.Router();
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
    const { location, temperature_celsius, humidity_percent, pressure_hpa } = req.body;

    try {
        const sensor = new Sensor(req.body);
        const createdSensorData = await sensor.save();
        // Check temperature threshold
        if (temperature_celsius > 30) {
            console.log(`High temperature detected at ${location}: ${temperature_celsius}°C (id: ${sensor._id})`);
            const msg = {
                to: `${process.env.EMAIL_TO}`,
                from: `${process.env.EMAIL_FROM}`,
                subject: 'High Temperature Alert',
                text: `High temperature detected at ${location}: ${temperature_celsius}°C (id: ${sensor._id})`,
            };
            sgMail.send(msg)
                .then(() => {
                    console.log('Email alert sent');
                })
                .catch((error) => {
                    console.error('Error sending email alert:', error);
                });

        }

        // Check humidity threshold
        if (humidity_percent > 70) {
            console.log(`High Humidity Percentage detected at ${location}: ${humidity_percent}% (id: ${sensor._id})`);
            const msg = {
                to: `${process.env.EMAIL_TO}`,
                from: `${process.env.EMAIL_FROM}`,
                subject: 'High Humidity Percentage Alert',
                text: `High Humidity Percentage detected at ${location}: ${humidity_percent}% (id: ${sensor._id})`,
            };
            sgMail.send(msg)
                .then(() => {
                    console.log('Email alert sent');
                })
                .catch((error) => {
                    console.error('Error sending email alert:', error);
                });

        }

        // Check pressure threshold
        if (pressure_hpa > 1000) {
            console.log(`High Pressure detected at ${location}: ${pressure_hpa} hPa (id: ${sensor._id})`);
            const msg = {
                to: `${process.env.EMAIL_TO}`,
                from: `${process.env.EMAIL_FROM}`,
                subject: 'High Pressure Alert',
                text: `High Pressure detected at ${location}: ${pressure_hpa} hPa (id: ${sensor._id})`,
            };
            sgMail.send(msg)
                .then(() => {
                    console.log('Email alert sent');
                })
                .catch((error) => {
                    console.error('Error sending email alert:', error);
                });
        }
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