const express = require('express');
const { body } = require('express-validator');
const {
  getAllDrivers,
  getDriver,
  createDriver,
  updateDriver,
  deleteDriver,
  updateDriverStatus
} = require('../controllers/driverController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const driverValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('licenseNumber').trim().notEmpty().withMessage('License number is required'),
  body('licenseExpiry').isISO8601().withMessage('Valid license expiry date is required'),
  body('licenseCategory').isIn(['Motorcycle', 'Van', 'Truck', 'Trailer']).withMessage('Invalid license category')
];

// Routes
router.get('/', protect, getAllDrivers);
router.get('/:id', protect, getDriver);
router.post('/', protect, authorize('manager', 'dispatcher'), driverValidation, createDriver);
router.put('/:id', protect, authorize('manager', 'dispatcher'), updateDriver);
router.delete('/:id', protect, authorize('manager'), deleteDriver);
router.patch('/:id/status', protect, updateDriverStatus);

module.exports = router;
