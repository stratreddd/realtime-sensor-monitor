const { validationResult } = require('express-validator');
const { param, body } = require('express-validator');
const mongoose = require('mongoose');

const validateId = [
    param('id').custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid ObjectId');
        }
        return true;
    })]

const sensorValidationRules = [
    body('timestamp')
        .isISO8601()
        .withMessage('Timestamp must be in ISO 8601 format')
        .toDate(),
    body('location')
        .isString()
        .notEmpty()
        .withMessage('Location is required and must be a string'),
    body('temperature_celsius')
        .isNumeric()
        .isFloat({ min: 20, max: 35 })
        .withMessage('Temperature must be a number between 20 and 35'),
    body('humidity_percent')
        .isInt({ min: 0, max: 100 })
        .withMessage('Humidity must be an integer between 0 and 100'),
    body('pressure_hpa')
        .isNumeric()
        .isFloat({ min: 970, max: 1020 })
        .withMessage('Pressure must be a number between 970 and 1020'),
];

const validateRules = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorData = errors.array().filter(err => err.msg != "Invalid value").map(err => err.msg).join(', ')
        return res.status(400).json({ error: errorData });
    }
    next();
};

module.exports = { validateId, sensorValidationRules, validateRules };