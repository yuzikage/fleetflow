const Vehicle = require('../models/Vehicle');
const Maintenance = require('../models/Maintenance');
const Trip = require('../models/Trip');
const Driver = require('../models/Driver');
const Expense = require('../models/Expense');

// @desc    Get Manager Dashboard Data
// @route   GET /api/dashboard/manager
// @access  Private (Manager only)
exports.getManagerDashboard = async (req, res) => {
  try {
    // Get all vehicles
    const vehicles = await Vehicle.find();
    
    // Calculate utilization data
    const utilizationData = {
      active: vehicles.filter(v => v.status === 'On Trip').length,
      idle: vehicles.filter(v => v.status === 'Available').length,
      maintenance: vehicles.filter(v => v.status === 'In Shop').length,
    };

    const totalVehicles = vehicles.length;
    const utilizationRate = totalVehicles > 0 
      ? ((utilizationData.active / totalVehicles) * 100).toFixed(1)
      : 0;

    // Get maintenance queue
    const maintenanceQueue = await Maintenance.find({
      status: { $in: ['Pending', 'In Progress'] }
    }).populate('vehicle');

    const urgentMaintenance = maintenanceQueue.filter(m => m.type === 'Urgent').length;

    // Calculate average fleet health
    const avgFleetHealth = vehicles.length > 0
      ? (vehicles.reduce((sum, v) => sum + v.healthScore, 0) / vehicles.length).toFixed(0)
      : 0;

    // Get critical alerts (vehicles with health < 70%)
    const criticalAlerts = vehicles.filter(v => v.healthScore < 70).length;

    // Get fleet health trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const healthTrendData = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = monthNames[date.getMonth()];
      
      // For now, use current health with slight variation
      // In production, you'd track historical health data
      const health = Math.max(70, parseInt(avgFleetHealth) + Math.floor(Math.random() * 10 - 5));
      
      healthTrendData.push({
        month: monthName,
        health: health
      });
    }

    // Get maintenance heatmap by vehicle type
    const vehicleTypes = ['Motorcycle', 'Van', 'Truck', 'Trailer'];
    const maintenanceHeatmap = [];

    for (const type of vehicleTypes) {
      const typeVehicles = vehicles.filter(v => v.type === type);
      
      if (typeVehicles.length === 0) continue;

      const typeVehicleIds = typeVehicles.map(v => v._id);
      
      const scheduled = await Maintenance.countDocuments({
        vehicle: { $in: typeVehicleIds },
        type: 'Scheduled',
        status: { $in: ['Pending', 'In Progress'] }
      });

      const urgent = await Maintenance.countDocuments({
        vehicle: { $in: typeVehicleIds },
        type: 'Urgent',
        status: { $in: ['Pending', 'In Progress'] }
      });

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const completed = await Maintenance.countDocuments({
        vehicle: { $in: typeVehicleIds },
        status: 'Completed',
        completedDate: { $gte: thirtyDaysAgo }
      });

      const avgHealth = typeVehicles.length > 0
        ? Math.round(typeVehicles.reduce((sum, v) => sum + v.healthScore, 0) / typeVehicles.length)
        : 0;

      maintenanceHeatmap.push({
        type: type + 's',
        scheduled,
        urgent,
        completed,
        health: avgHealth
      });
    }

    res.status(200).json({
      success: true,
      data: {
        kpis: {
          utilizationRate: parseFloat(utilizationRate),
          maintenanceQueue: maintenanceQueue.length,
          urgentMaintenance,
          avgFleetHealth: parseInt(avgFleetHealth),
          criticalAlerts,
          totalVehicles
        },
        utilizationData: [
          { name: 'Active', value: utilizationData.active, color: '#10B981' },
          { name: 'Idle', value: utilizationData.idle, color: '#F59E0B' },
          { name: 'Maintenance', value: utilizationData.maintenance, color: '#EF4444' }
        ],
        healthTrendData,
        maintenanceHeatmap
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// @desc    Get Dispatcher Dashboard Data
// @route   GET /api/dashboard/dispatcher
// @access  Private (Dispatcher only)
exports.getDispatcherDashboard = async (req, res) => {
  try {
    // Get pending cargo (trips in Draft status)
    const cargoQueue = await Trip.find({ status: 'Draft' })
      .populate('vehicle', 'name')
      .sort({ priority: -1, createdAt: 1 })
      .limit(10);

    // Get active trips
    const activeTrips = await Trip.find({ status: { $in: ['Dispatched', 'In Progress'] } })
      .populate('vehicle', 'name licensePlate')
      .populate('driver', 'name')
      .sort({ startedAt: -1 })
      .limit(10);

    // Get trip stats for last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const tripStats = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const completed = await Trip.countDocuments({
        status: 'Completed',
        completedAt: { $gte: date, $lt: nextDate }
      });

      const pending = await Trip.countDocuments({
        status: { $in: ['Draft', 'Dispatched', 'In Progress'] },
        createdAt: { $gte: date, $lt: nextDate }
      });

      tripStats.push({
        day: dayNames[date.getDay()],
        completed,
        pending
      });
    }

    // KPIs
    const totalActiveTrips = activeTrips.length;
    const totalPendingCargo = cargoQueue.length;
    const availableVehicles = await Vehicle.countDocuments({ status: 'Available' });
    const availableDrivers = await Driver.countDocuments({ status: 'On Duty' });

    res.status(200).json({
      success: true,
      data: {
        kpis: {
          activeTrips: totalActiveTrips,
          pendingCargo: totalPendingCargo,
          availableVehicles,
          availableDrivers
        },
        cargoQueue: cargoQueue.map(trip => ({
          id: trip.tripId,
          origin: trip.origin,
          destination: trip.destination,
          weight: trip.cargoWeight,
          priority: trip.priority,
          eta: trip.estimatedDuration ? `${Math.round(trip.estimatedDuration / 60)} hours` : 'TBD'
        })),
        activeTrips: activeTrips.map(trip => ({
          id: trip.tripId,
          vehicle: trip.vehicle?.licensePlate || 'N/A',
          driver: trip.driver?.name || 'N/A',
          progress: trip.progress,
          eta: trip.estimatedDuration ? `${Math.round((trip.estimatedDuration * (100 - trip.progress)) / 100)} min` : 'TBD'
        })),
        tripStats
      }
    });
  } catch (error) {
    console.error('Dispatcher dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get Safety Officer Dashboard Data
// @route   GET /api/dashboard/safety
// @access  Private (Safety Officer only)
exports.getSafetyDashboard = async (req, res) => {
  try {
    // Get all drivers
    const drivers = await Driver.find();

    // License expiry alerts (expiring in next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const expiringLicenses = drivers.filter(d => 
      d.licenseExpiry <= thirtyDaysFromNow && d.licenseExpiry >= new Date()
    ).length;

    const expiredLicenses = drivers.filter(d => d.licenseExpiry < new Date()).length;

    // Driver compliance stats
    const totalDrivers = drivers.length;
    const activeDrivers = drivers.filter(d => d.status === 'On Duty').length;
    const suspendedDrivers = drivers.filter(d => d.status === 'Suspended').length;

    // Average safety score
    const avgSafetyScore = drivers.length > 0
      ? Math.round(drivers.reduce((sum, d) => sum + d.safetyScore, 0) / drivers.length)
      : 0;

    // Safety score distribution
    const safetyDistribution = [
      { range: '90-100', count: drivers.filter(d => d.safetyScore >= 90).length, color: '#10B981' },
      { range: '70-89', count: drivers.filter(d => d.safetyScore >= 70 && d.safetyScore < 90).length, color: '#F59E0B' },
      { range: '<70', count: drivers.filter(d => d.safetyScore < 70).length, color: '#EF4444' }
    ];

    // Driver performance list
    const driverPerformance = drivers
      .sort((a, b) => b.safetyScore - a.safetyScore)
      .slice(0, 10)
      .map(driver => ({
        name: driver.name,
        safetyScore: driver.safetyScore,
        completionRate: driver.tripCompletionRate,
        totalTrips: driver.totalTrips,
        status: driver.status,
        licenseExpiry: driver.licenseExpiry
      }));

    res.status(200).json({
      success: true,
      data: {
        kpis: {
          totalDrivers,
          activeDrivers,
          avgSafetyScore,
          expiringLicenses,
          expiredLicenses,
          suspendedDrivers
        },
        safetyDistribution,
        driverPerformance
      }
    });
  } catch (error) {
    console.error('Safety dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get Financial Analyst Dashboard Data
// @route   GET /api/dashboard/financial
// @access  Private (Financial Analyst only)
exports.getFinancialDashboard = async (req, res) => {
  try {
    // Get expenses for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await Expense.find({ date: { $gte: thirtyDaysAgo } })
      .populate('vehicle', 'name type');

    // Calculate totals by type
    const fuelExpenses = expenses.filter(e => e.type === 'Fuel')
      .reduce((sum, e) => sum + e.amount, 0);
    
    const maintenanceExpenses = expenses.filter(e => e.type === 'Maintenance')
      .reduce((sum, e) => sum + e.amount, 0);
    
    const otherExpenses = expenses.filter(e => !['Fuel', 'Maintenance'].includes(e.type))
      .reduce((sum, e) => sum + e.amount, 0);

    const totalExpenses = fuelExpenses + maintenanceExpenses + otherExpenses;

    // Expense breakdown
    const expenseBreakdown = [
      { category: 'Fuel', amount: fuelExpenses, color: '#3B82F6', percentage: totalExpenses > 0 ? Math.round((fuelExpenses / totalExpenses) * 100) : 0 },
      { category: 'Maintenance', amount: maintenanceExpenses, color: '#F59E0B', percentage: totalExpenses > 0 ? Math.round((maintenanceExpenses / totalExpenses) * 100) : 0 },
      { category: 'Other', amount: otherExpenses, color: '#10B981', percentage: totalExpenses > 0 ? Math.round((otherExpenses / totalExpenses) * 100) : 0 }
    ];

    // Monthly trend (last 6 months)
    const monthlyTrend = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthExpenses = await Expense.find({
        date: { $gte: monthStart, $lte: monthEnd }
      });

      const fuel = monthExpenses.filter(e => e.type === 'Fuel').reduce((sum, e) => sum + e.amount, 0);
      const maintenance = monthExpenses.filter(e => e.type === 'Maintenance').reduce((sum, e) => sum + e.amount, 0);
      const other = monthExpenses.filter(e => !['Fuel', 'Maintenance'].includes(e.type)).reduce((sum, e) => sum + e.amount, 0);

      monthlyTrend.push({
        month: monthNames[date.getMonth()],
        fuel: Math.round(fuel),
        maintenance: Math.round(maintenance),
        other: Math.round(other)
      });
    }

    // Top spending vehicles
    const vehicleExpenses = {};
    expenses.forEach(expense => {
      const vehicleId = expense.vehicle?._id?.toString();
      if (vehicleId) {
        if (!vehicleExpenses[vehicleId]) {
          vehicleExpenses[vehicleId] = {
            name: expense.vehicle.name,
            type: expense.vehicle.type,
            total: 0
          };
        }
        vehicleExpenses[vehicleId].total += expense.amount;
      }
    });

    const topSpendingVehicles = Object.values(vehicleExpenses)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    // Calculate fuel efficiency
    const fuelExpensesList = expenses.filter(e => e.type === 'Fuel' && e.quantity);
    const totalFuelLiters = fuelExpensesList.reduce((sum, e) => sum + (e.quantity || 0), 0);
    const totalFuelCost = fuelExpensesList.reduce((sum, e) => sum + e.amount, 0);
    const avgFuelPrice = totalFuelLiters > 0 ? (totalFuelCost / totalFuelLiters).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      data: {
        kpis: {
          totalExpenses: Math.round(totalExpenses),
          fuelExpenses: Math.round(fuelExpenses),
          maintenanceExpenses: Math.round(maintenanceExpenses),
          avgFuelPrice: parseFloat(avgFuelPrice)
        },
        expenseBreakdown,
        monthlyTrend,
        topSpendingVehicles
      }
    });
  } catch (error) {
    console.error('Financial dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
