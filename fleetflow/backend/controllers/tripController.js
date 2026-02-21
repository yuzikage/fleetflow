const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const { validationResult } = require('express-validator');

// @desc    Get all trips
// @route   GET /api/trips
// @access  Private
exports.getAllTrips = async (req, res) => {
  try {
    const { status, priority, search } = req.query;
    
    let query = {};
    
    // Status filter
    if (status) {
      query.status = status;
    }
    
    // Priority filter
    if (priority) {
      query.priority = priority;
    }
    
    // Search filter
    if (search) {
      query.$or = [
        { tripId: { $regex: search, $options: 'i' } },
        { origin: { $regex: search, $options: 'i' } },
        { destination: { $regex: search, $options: 'i' } }
      ];
    }
    
    const trips = await Trip.find(query)
      .populate('vehicle', 'name licensePlate type')
      .populate('driver', 'name email phone')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('vehicle', 'name licensePlate type maxCapacity')
      .populate('driver', 'name email phone licenseNumber');
    
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    
    res.status(200).json({
      success: true,
      data: trip
    });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Create trip
// @route   POST /api/trips
// @access  Private (Manager, Dispatcher)
exports.createTrip = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Invalid input', errors: errors.array() });
  }
  
  try {
    const { 
      vehicle, 
      driver, 
      origin, 
      destination, 
      cargoWeight, 
      cargoDescription,
      priority,
      scheduledDate,
      estimatedDuration
    } = req.body;
    
    // Verify vehicle exists and is available
    const vehicleDoc = await Vehicle.findById(vehicle);
    if (!vehicleDoc) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }
    
    if (vehicleDoc.status !== 'Available') {
      return res.status(400).json({ success: false, message: 'Vehicle is not available' });
    }
    
    // Check cargo weight vs vehicle capacity
    if (cargoWeight > vehicleDoc.maxCapacity) {
      return res.status(400).json({ 
        success: false, 
        message: `Cargo weight (${cargoWeight} kg) exceeds vehicle capacity (${vehicleDoc.maxCapacity} kg)` 
      });
    }
    
    // Verify driver exists and is available
    const driverDoc = await Driver.findById(driver);
    if (!driverDoc) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    
    if (driverDoc.status !== 'On Duty') {
      return res.status(400).json({ success: false, message: 'Driver is not on duty' });
    }
    
    // Check if driver license is expired
    if (driverDoc.licenseExpiry < new Date()) {
      return res.status(400).json({ success: false, message: 'Driver license has expired' });
    }
    
    // Generate unique trip ID
    const tripCount = await Trip.countDocuments();
    const tripId = `TRP-${String(tripCount + 1).padStart(4, '0')}`;
    
    // Create trip
    const trip = await Trip.create({
      tripId,
      vehicle,
      driver,
      origin,
      destination,
      cargoWeight,
      cargoDescription,
      priority: priority || 'medium',
      scheduledDate,
      estimatedDuration,
      status: 'Draft'
    });
    
    // Populate the response
    const populatedTrip = await Trip.findById(trip._id)
      .populate('vehicle', 'name licensePlate type')
      .populate('driver', 'name email');
    
    res.status(201).json({
      success: true,
      data: populatedTrip
    });
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private (Manager, Dispatcher)
exports.updateTrip = async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    
    // If updating vehicle, check availability and capacity
    if (req.body.vehicle && req.body.vehicle !== trip.vehicle.toString()) {
      const vehicleDoc = await Vehicle.findById(req.body.vehicle);
      if (!vehicleDoc) {
        return res.status(404).json({ success: false, message: 'Vehicle not found' });
      }
      
      const cargoWeight = req.body.cargoWeight || trip.cargoWeight;
      if (cargoWeight > vehicleDoc.maxCapacity) {
        return res.status(400).json({ 
          success: false, 
          message: `Cargo weight exceeds vehicle capacity` 
        });
      }
    }
    
    // If updating driver, check availability
    if (req.body.driver && req.body.driver !== trip.driver.toString()) {
      const driverDoc = await Driver.findById(req.body.driver);
      if (!driverDoc) {
        return res.status(404).json({ success: false, message: 'Driver not found' });
      }
    }
    
    trip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('vehicle', 'name licensePlate type')
     .populate('driver', 'name email');
    
    res.status(200).json({
      success: true,
      data: trip
    });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private (Manager only)
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    
    // Don't allow deletion of in-progress trips
    if (trip.status === 'In Progress') {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete trip in progress' 
      });
    }
    
    await trip.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update trip status
// @route   PATCH /api/trips/:id/status
// @access  Private
exports.updateTripStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['Draft', 'Dispatched', 'In Progress', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    const trip = await Trip.findById(req.params.id);
    
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    
    // Update vehicle status based on trip status
    if (status === 'Dispatched' || status === 'In Progress') {
      await Vehicle.findByIdAndUpdate(trip.vehicle, { status: 'On Trip' });
      
      if (status === 'In Progress' && !trip.startedAt) {
        trip.startedAt = new Date();
      }
    } else if (status === 'Completed' || status === 'Cancelled') {
      await Vehicle.findByIdAndUpdate(trip.vehicle, { status: 'Available' });
      
      if (status === 'Completed' && !trip.completedAt) {
        trip.completedAt = new Date();
        trip.progress = 100;
      }
    }
    
    trip.status = status;
    await trip.save();
    
    const updatedTrip = await Trip.findById(trip._id)
      .populate('vehicle', 'name licensePlate type')
      .populate('driver', 'name email');
    
    res.status(200).json({
      success: true,
      data: updatedTrip
    });
  } catch (error) {
    console.error('Update trip status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Update trip progress
// @route   PATCH /api/trips/:id/progress
// @access  Private
exports.updateTripProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    
    if (progress < 0 || progress > 100) {
      return res.status(400).json({ success: false, message: 'Progress must be between 0 and 100' });
    }
    
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { progress },
      { new: true, runValidators: true }
    ).populate('vehicle', 'name licensePlate')
     .populate('driver', 'name');
    
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    
    // Auto-complete if progress reaches 100
    if (progress === 100 && trip.status !== 'Completed') {
      trip.status = 'Completed';
      trip.completedAt = new Date();
      await trip.save();
      await Vehicle.findByIdAndUpdate(trip.vehicle, { status: 'Available' });
    }
    
    res.status(200).json({
      success: true,
      data: trip
    });
  } catch (error) {
    console.error('Update trip progress error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
