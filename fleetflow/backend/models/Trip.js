const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  tripId: {
    type: String,
    required: true,
    unique: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  cargoWeight: {
    type: Number,
    required: true,
  },
  cargoDescription: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Draft', 'Dispatched', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Draft',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  startOdometer: {
    type: Number,
  },
  endOdometer: {
    type: Number,
  },
  scheduledDate: {
    type: Date,
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  estimatedDuration: {
    type: Number, // in minutes
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Trip', tripSchema);
