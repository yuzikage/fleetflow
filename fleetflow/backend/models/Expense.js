const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
  },
  type: {
    type: String,
    enum: ['Fuel', 'Maintenance', 'Toll', 'Parking', 'Other'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number, // liters for fuel
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  receiptNumber: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Expense', expenseSchema);
