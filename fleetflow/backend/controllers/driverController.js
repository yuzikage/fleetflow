const Driver = require('../models/Driver');
const { validationResult } = require('express-validator');

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Private
exports.getAllDrivers = async (req, res) => {
  try {
    const { search, status } = req.query;
    
    let query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { licenseNumber: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Status filter
    if (status) {
      query.status = status;
    }
    
    const drivers = await Driver.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: drivers.length,
      data: drivers
    });
  } catch (error) {
    console.error('Get drivers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single driver
// @route   GET /api/drivers/:id
// @access  Private
exports.getDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    
    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (error) {
    console.error('Get driver error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create driver
// @route   POST /api/drivers
// @access  Private (Manager, Dispatcher)
exports.createDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Invalid input', errors: errors.array() });
  }
  
  try {
    const { name, email, phone, licenseNumber, licenseExpiry, licenseCategory } = req.body;
    
    // Check if email already exists
    const existingEmail = await Driver.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Driver with this email already exists' });
    }
    
    // Check if license number already exists
    const existingLicense = await Driver.findOne({ licenseNumber });
    if (existingLicense) {
      return res.status(400).json({ success: false, message: 'Driver with this license number already exists' });
    }
    
    const driver = await Driver.create({
      name,
      email,
      phone,
      licenseNumber,
      licenseExpiry,
      licenseCategory
    });
    
    res.status(201).json({
      success: true,
      data: driver
    });
  } catch (error) {
    console.error('Create driver error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update driver
// @route   PUT /api/drivers/:id
// @access  Private (Manager, Dispatcher)
exports.updateDriver = async (req, res) => {
  try {
    let driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    
    // Check if email is being changed and if it already exists
    if (req.body.email && req.body.email !== driver.email) {
      const existingEmail = await Driver.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({ success: false, message: 'Driver with this email already exists' });
      }
    }
    
    // Check if license number is being changed and if it already exists
    if (req.body.licenseNumber && req.body.licenseNumber !== driver.licenseNumber) {
      const existingLicense = await Driver.findOne({ licenseNumber: req.body.licenseNumber });
      if (existingLicense) {
        return res.status(400).json({ success: false, message: 'Driver with this license number already exists' });
      }
    }
    
    driver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (error) {
    console.error('Update driver error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Private (Manager only)
exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    
    await driver.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Driver deleted successfully'
    });
  } catch (error) {
    console.error('Delete driver error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update driver status
// @route   PATCH /api/drivers/:id/status
// @access  Private
exports.updateDriverStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['On Duty', 'Off Duty', 'Suspended'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    
    res.status(200).json({
      success: true,
      data: driver
    });
  } catch (error) {
    console.error('Update driver status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
