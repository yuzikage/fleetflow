const express = require('express');
const { body } = require('express-validator');
const {
  getAllTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
  updateTripStatus,
  updateTripProgress
} = require('../controllers/tripController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const tripValidation = [
  body('vehicle').notEmpty().withMessage('Vehicle is required'),
  body('driver').notEmpty().withMessage('Driver is required'),
  body('origin').trim().notEmpty().withMessage('Origin is required'),
  body('destination').trim().notEmpty().withMessage('Destination is required'),
  body('cargoWeight').isNumeric().withMessage('Cargo weight must be a number'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Invalid priority')
];

// Routes
router.get('/', protect, getAllTrips);
router.get('/:id', protect, getTrip);
router.post('/', protect, authorize('manager', 'dispatcher'), tripValidation, createTrip);
router.put('/:id', protect, authorize('manager', 'dispatcher'), updateTrip);
router.delete('/:id', protect, authorize('manager'), deleteTrip);
router.patch('/:id/status', protect, updateTripStatus);
router.patch('/:id/progress', protect, updateTripProgress);

module.exports = router;
