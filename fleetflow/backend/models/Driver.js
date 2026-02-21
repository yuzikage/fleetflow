const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  licenseExpiry: {
    type: Date,
    required: true,
  },
  licenseCategory: {
    type: String,
    enum: ['Motorcycle', 'Van', 'Truck', 'Trailer'],
    required: true,
  },
  status: {
    type: String,
    enum: ['On Duty', 'Off Duty', 'Suspended'],
    default: 'Off Duty',
  },
  safetyScore: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
  },
  tripCompletionRate: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
  },
  totalTrips: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Driver', driverSchema);
