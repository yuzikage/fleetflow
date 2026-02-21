const express = require('express');
const { body } = require('express-validator');
const {
  getAllVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  updateVehicleStatus
} = require('../controllers/vehicleController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const vehicleValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('licensePlate').trim().notEmpty().withMessage('License plate is required'),
  body('type').isIn(['Motorcycle', 'Van', 'Truck', 'Trailer']).withMessage('Invalid vehicle type'),
  body('maxCapacity').isNumeric().withMessage('Max capacity must be a number')
];

// Routes
router.get('/', protect, getAllVehicles);
router.get('/:id', protect, getVehicle);
router.post('/', protect, authorize('manager', 'dispatcher'), vehicleValidation, createVehicle);
router.put('/:id', protect, authorize('manager', 'dispatcher'), updateVehicle);
router.delete('/:id', protect, authorize('manager'), deleteVehicle);
router.patch('/:id/status', protect, updateVehicleStatus);

module.exports = router;
