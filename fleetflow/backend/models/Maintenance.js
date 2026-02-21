const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  type: {
    type: String,
    enum: ['Scheduled', 'Urgent', 'Completed'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  scheduledDate: {
    type: Date,
  },
  completedDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
