require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
const Maintenance = require('../models/Maintenance');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const Expense = require('../models/Expense');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedAllData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Vehicle.deleteMany({});
    await Maintenance.deleteMany({});
    await Driver.deleteMany({});
    await Trip.deleteMany({});
    await Expense.deleteMany({});

    // Create vehicles
    console.log('🚗 Creating vehicles...');
    const vehicles = await Vehicle.insertMany([
      // Motorcycles
      { name: 'Bike-01', licensePlate: 'MC-001', type: 'Motorcycle', maxCapacity: 50, odometer: 15000, status: 'On Trip', healthScore: 95 },
      { name: 'Bike-02', licensePlate: 'MC-002', type: 'Motorcycle', maxCapacity: 50, odometer: 12000, status: 'Available', healthScore: 98 },
      { name: 'Bike-03', licensePlate: 'MC-003', type: 'Motorcycle', maxCapacity: 50, odometer: 18000, status: 'Available', healthScore: 92 },
      
      // Vans
      { name: 'Van-01', licensePlate: 'VN-001', type: 'Van', maxCapacity: 500, odometer: 45000, status: 'On Trip', healthScore: 88 },
      { name: 'Van-02', licensePlate: 'VN-002', type: 'Van', maxCapacity: 500, odometer: 38000, status: 'On Trip', healthScore: 91 },
      { name: 'Van-03', licensePlate: 'VN-003', type: 'Van', maxCapacity: 500, odometer: 52000, status: 'Available', healthScore: 85 },
      { name: 'Van-04', licensePlate: 'VN-004', type: 'Van', maxCapacity: 500, odometer: 41000, status: 'Available', healthScore: 89 },
      { name: 'Van-05', licensePlate: 'VN-005', type: 'Van', maxCapacity: 500, odometer: 55000, status: 'In Shop', healthScore: 78 },
      
      // Trucks
      { name: 'Truck-01', licensePlate: 'TK-001', type: 'Truck', maxCapacity: 2000, odometer: 85000, status: 'On Trip', healthScore: 82 },
      { name: 'Truck-02', licensePlate: 'TK-002', type: 'Truck', maxCapacity: 2000, odometer: 72000, status: 'On Trip', healthScore: 86 },
      { name: 'Truck-03', licensePlate: 'TK-003', type: 'Truck', maxCapacity: 2000, odometer: 95000, status: 'Available', healthScore: 75 },
      { name: 'Truck-04', licensePlate: 'TK-004', type: 'Truck', maxCapacity: 2000, odometer: 68000, status: 'Available', healthScore: 88 },
      { name: 'Truck-05', licensePlate: 'TK-005', type: 'Truck', maxCapacity: 2000, odometer: 102000, status: 'In Shop', healthScore: 68 },
      
      // Trailers
      { name: 'Trailer-01', licensePlate: 'TR-001', type: 'Trailer', maxCapacity: 5000, odometer: 125000, status: 'On Trip', healthScore: 90 },
      { name: 'Trailer-02', licensePlate: 'TR-002', type: 'Trailer', maxCapacity: 5000, odometer: 118000, status: 'Available', healthScore: 93 },
      { name: 'Trailer-03', licensePlate: 'TR-003', type: 'Trailer', maxCapacity: 5000, odometer: 135000, status: 'Available', healthScore: 87 },
    ]);
    console.log(`   ✓ ${vehicles.length} vehicles created`);

    // Create drivers
    console.log('👨‍✈️ Creating drivers...');
    const drivers = await Driver.insertMany([
      { name: 'John Doe', email: 'john@fleet.com', phone: '555-0101', licenseNumber: 'DL-001', licenseExpiry: new Date('2026-12-31'), licenseCategory: 'Truck', status: 'On Duty', safetyScore: 95, tripCompletionRate: 98, totalTrips: 145 },
      { name: 'Jane Smith', email: 'jane@fleet.com', phone: '555-0102', licenseNumber: 'DL-002', licenseExpiry: new Date('2027-06-30'), licenseCategory: 'Van', status: 'On Duty', safetyScore: 92, tripCompletionRate: 96, totalTrips: 132 },
      { name: 'Bob Wilson', email: 'bob@fleet.com', phone: '555-0103', licenseNumber: 'DL-003', licenseExpiry: new Date('2026-03-15'), licenseCategory: 'Van', status: 'On Duty', safetyScore: 88, tripCompletionRate: 94, totalTrips: 118 },
      { name: 'Alice Chen', email: 'alice@fleet.com', phone: '555-0104', licenseNumber: 'DL-004', licenseExpiry: new Date('2027-09-20'), licenseCategory: 'Motorcycle', status: 'On Duty', safetyScore: 97, tripCompletionRate: 99, totalTrips: 203 },
      { name: 'Mike Jones', email: 'mike@fleet.com', phone: '555-0105', licenseNumber: 'DL-005', licenseExpiry: new Date('2026-11-10'), licenseCategory: 'Truck', status: 'Off Duty', safetyScore: 85, tripCompletionRate: 91, totalTrips: 98 },
      { name: 'Sarah Brown', email: 'sarah@fleet.com', phone: '555-0106', licenseNumber: 'DL-006', licenseExpiry: new Date('2025-12-31'), licenseCategory: 'Van', status: 'On Duty', safetyScore: 65, tripCompletionRate: 78, totalTrips: 87 },
      { name: 'Tom Davis', email: 'tom@fleet.com', phone: '555-0107', licenseNumber: 'DL-007', licenseExpiry: new Date('2027-04-25'), licenseCategory: 'Trailer', status: 'On Duty', safetyScore: 93, tripCompletionRate: 97, totalTrips: 156 },
      { name: 'Lisa Garcia', email: 'lisa@fleet.com', phone: '555-0108', licenseNumber: 'DL-008', licenseExpiry: new Date('2026-08-15'), licenseCategory: 'Motorcycle', status: 'Off Duty', safetyScore: 90, tripCompletionRate: 95, totalTrips: 178 },
    ]);
    console.log(`   ✓ ${drivers.length} drivers created`);

    // Create trips
    console.log('🚚 Creating trips...');
    const trips = [];
    
    // Active trips (In Progress)
    trips.push(
      { tripId: 'TRP-001', vehicle: vehicles[3]._id, driver: drivers[0]._id, origin: 'Warehouse A', destination: 'Client Site 1', cargoWeight: 450, status: 'In Progress', priority: 'high', progress: 75, startOdometer: 45000, estimatedDuration: 120, startedAt: new Date(Date.now() - 90 * 60000) },
      { tripId: 'TRP-002', vehicle: vehicles[8]._id, driver: drivers[1]._id, origin: 'Warehouse B', destination: 'Client Site 2', cargoWeight: 1800, status: 'In Progress', priority: 'medium', progress: 20, startOdometer: 85000, estimatedDuration: 240, startedAt: new Date(Date.now() - 48 * 60000) },
      { tripId: 'TRP-003', vehicle: vehicles[4]._id, driver: drivers[2]._id, origin: 'Warehouse A', destination: 'Client Site 3', cargoWeight: 480, status: 'In Progress', priority: 'high', progress: 90, startOdometer: 38000, estimatedDuration: 90, startedAt: new Date(Date.now() - 81 * 60000) },
      { tripId: 'TRP-004', vehicle: vehicles[0]._id, driver: drivers[3]._id, origin: 'Warehouse C', destination: 'Client Site 4', cargoWeight: 45, status: 'In Progress', priority: 'low', progress: 50, startOdometer: 15000, estimatedDuration: 60, startedAt: new Date(Date.now() - 30 * 60000) },
      { tripId: 'TRP-005', vehicle: vehicles[9]._id, driver: drivers[6]._id, origin: 'Warehouse B', destination: 'Client Site 5', cargoWeight: 1950, status: 'In Progress', priority: 'medium', progress: 35, startOdometer: 72000, estimatedDuration: 180, startedAt: new Date(Date.now() - 63 * 60000) }
    );

    // Pending cargo (Draft)
    trips.push(
      { tripId: 'CRG-001', vehicle: vehicles[5]._id, driver: drivers[4]._id, origin: 'Warehouse A', destination: 'Client Site 6', cargoWeight: 1500, status: 'Draft', priority: 'high', estimatedDuration: 120 },
      { tripId: 'CRG-002', vehicle: vehicles[6]._id, driver: drivers[5]._id, origin: 'Warehouse B', destination: 'Client Site 7', cargoWeight: 800, status: 'Draft', priority: 'medium', estimatedDuration: 240 },
      { tripId: 'CRG-003', vehicle: vehicles[10]._id, driver: drivers[0]._id, origin: 'Warehouse A', destination: 'Client Site 8', cargoWeight: 2200, status: 'Draft', priority: 'high', estimatedDuration: 60 },
      { tripId: 'CRG-004', vehicle: vehicles[11]._id, driver: drivers[1]._id, origin: 'Warehouse C', destination: 'Client Site 9', cargoWeight: 1200, status: 'Draft', priority: 'low', estimatedDuration: 360 },
      { tripId: 'CRG-005', vehicle: vehicles[2]._id, driver: drivers[7]._id, origin: 'Warehouse B', destination: 'Client Site 10', cargoWeight: 950, status: 'Draft', priority: 'medium', estimatedDuration: 180 }
    );

    // Completed trips (last 7 days)
    const completedTrips = [12, 15, 18, 14, 20, 10, 8];
    let tripCounter = 6;
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      for (let j = 0; j < completedTrips[6 - i]; j++) {
        const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        const driver = drivers[Math.floor(Math.random() * drivers.length)];
        const completedDate = new Date(date.getTime() + Math.random() * 24 * 60 * 60 * 1000);
        
        trips.push({
          tripId: `TRP-${String(tripCounter++).padStart(3, '0')}`,
          vehicle: vehicle._id,
          driver: driver._id,
          origin: `Warehouse ${String.fromCharCode(65 + Math.floor(Math.random() * 3))}`,
          destination: `Client Site ${Math.floor(Math.random() * 20) + 1}`,
          cargoWeight: Math.floor(Math.random() * 2000) + 100,
          status: 'Completed',
          priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          progress: 100,
          startOdometer: vehicle.odometer - Math.floor(Math.random() * 500),
          endOdometer: vehicle.odometer,
          estimatedDuration: Math.floor(Math.random() * 300) + 60,
          startedAt: new Date(completedDate.getTime() - Math.random() * 6 * 60 * 60 * 1000),
          completedAt: completedDate
        });
      }
    }

    await Trip.insertMany(trips);
    console.log(`   ✓ ${trips.length} trips created`);

    // Create maintenance records
    console.log('🔧 Creating maintenance records...');
    const maintenanceRecords = [];

    // Scheduled maintenance
    for (let i = 0; i < 11; i++) {
      const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
      maintenanceRecords.push({
        vehicle: vehicle._id,
        type: 'Scheduled',
        description: 'Regular oil change and inspection',
        cost: 150 + Math.floor(Math.random() * 200),
        scheduledDate: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        status: 'Pending'
      });
    }

    // Urgent maintenance
    const urgentVehicles = vehicles.filter(v => v.healthScore < 80);
    for (const vehicle of urgentVehicles.slice(0, 3)) {
      maintenanceRecords.push({
        vehicle: vehicle._id,
        type: 'Urgent',
        description: 'Critical repair needed',
        cost: 500 + Math.floor(Math.random() * 1000),
        scheduledDate: new Date(),
        status: 'In Progress'
      });
    }

    // Completed maintenance (last 30 days)
    for (let i = 0; i < 97; i++) {
      const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
      const daysAgo = Math.floor(Math.random() * 30);
      const completedDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      
      maintenanceRecords.push({
        vehicle: vehicle._id,
        type: Math.random() > 0.5 ? 'Scheduled' : 'Urgent',
        description: 'Maintenance completed',
        cost: 100 + Math.floor(Math.random() * 500),
        scheduledDate: new Date(completedDate.getTime() - 2 * 24 * 60 * 60 * 1000),
        completedDate: completedDate,
        status: 'Completed'
      });
    }

    await Maintenance.insertMany(maintenanceRecords);
    console.log(`   ✓ ${maintenanceRecords.length} maintenance records created`);

    // Create expenses
    console.log('💰 Creating expenses...');
    const expenses = [];

    // Fuel expenses (last 30 days)
    for (let i = 0; i < 150; i++) {
      const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
      const daysAgo = Math.floor(Math.random() * 30);
      const liters = 20 + Math.floor(Math.random() * 80);
      const pricePerLiter = 1.2 + Math.random() * 0.5;
      
      expenses.push({
        vehicle: vehicle._id,
        type: 'Fuel',
        amount: Math.round(liters * pricePerLiter * 100) / 100,
        quantity: liters,
        description: 'Fuel refill',
        date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
        receiptNumber: `FUEL-${Date.now()}-${i}`
      });
    }

    // Maintenance expenses (from maintenance records)
    const completedMaintenance = maintenanceRecords.filter(m => m.status === 'Completed');
    completedMaintenance.forEach((m, i) => {
      expenses.push({
        vehicle: m.vehicle,
        type: 'Maintenance',
        amount: m.cost,
        description: m.description,
        date: m.completedDate,
        receiptNumber: `MAINT-${Date.now()}-${i}`
      });
    });

    // Other expenses
    for (let i = 0; i < 30; i++) {
      const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
      const daysAgo = Math.floor(Math.random() * 30);
      const types = ['Toll', 'Parking', 'Other'];
      
      expenses.push({
        vehicle: vehicle._id,
        type: types[Math.floor(Math.random() * types.length)],
        amount: 10 + Math.floor(Math.random() * 90),
        description: 'Miscellaneous expense',
        date: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
        receiptNumber: `EXP-${Date.now()}-${i}`
      });
    }

    await Expense.insertMany(expenses);
    console.log(`   ✓ ${expenses.length} expenses created`);

    console.log('\n✅ All data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Vehicles: ${vehicles.length}`);
    console.log(`   Drivers: ${drivers.length}`);
    console.log(`   Trips: ${trips.length}`);
    console.log(`   Maintenance: ${maintenanceRecords.length}`);
    console.log(`   Expenses: ${expenses.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedAllData();
