const Vehicle = require('../models/Vehicle');
const { validationResult } = require('express-validator');

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Private
exports.getAllVehicles = async (req, res) => {
  try {
    const { search, status, type } = req.query;
    
    let query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { licensePlate: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Status filter
    if (status) {
      query.status = status;
    }
    
    // Type filter
    if (type) {
      query.type = type;
    }
    
    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Private
exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    
    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('Get vehicle error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create vehicle
// @route   POST /api/vehicles
// @access  Private (Manager, Dispatcher)
exports.createVehicle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Invalid input', errors: errors.array() });
  }
  
  try {
    const { name, licensePlate, type, maxCapacity, odometer, acquisitionDate, acquisitionCost } = req.body;
    
    // Check if license plate already exists
    const existingVehicle = await Vehicle.findOne({ licensePlate });
    if (existingVehicle) {
      return res.status(400).json({ success: false, message: 'Vehicle with this license plate already exists' });
    }
    
    const vehicle = await Vehicle.create({
      name,
      licensePlate,
      type,
      maxCapacity,
      odometer: odometer || 0,
      acquisitionDate: acquisitionDate || Date.now(),
      acquisitionCost: acquisitionCost || 0
    });
    
    res.status(201).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('Create vehicle error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private (Manager, Dispatcher)
exports.updateVehicle = async (req, res) => {
  try {
    let vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    
    // Check if license plate is being changed and if it already exists
    if (req.body.licensePlate && req.body.licensePlate !== vehicle.licensePlate) {
      const existingVehicle = await Vehicle.findOne({ licensePlate: req.body.licensePlate });
      if (existingVehicle) {
        return res.status(400).json({ success: false, message: 'Vehicle with this license plate already exists' });
      }
    }
    
    vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private (Manager only)
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    
    await vehicle.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update vehicle status
// @route   PATCH /api/vehicles/:id/status
// @access  Private
exports.updateVehicleStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['Available', 'On Trip', 'In Shop', 'Retired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    
    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error('Update vehicle status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
