const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['Motorcycle', 'Van', 'Truck', 'Trailer'],
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  odometer: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Available', 'On Trip', 'In Shop', 'Retired'],
    default: 'Available',
  },
  healthScore: {
    type: Number,
    default: 100,
    min: 0,
    max: 100,
  },
  acquisitionDate: {
    type: Date,
    default: Date.now,
  },
  acquisitionCost: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
