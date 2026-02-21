require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const Maintenance = require('../models/Maintenance');
const Expense = require('../models/Expense');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await Driver.deleteMany({});
    await Trip.deleteMany({});
    await Maintenance.deleteMany({});
    await Expense.deleteMany({});

    // Create Users
    console.log('👥 Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.insertMany([
      {
        name: 'Fleet Manager',
        email: 'manager@fleetflow.com',
        password: hashedPassword,
        role: 'manager'
      },
      {
        name: 'Dispatcher User',
        email: 'dispatcher@fleetflow.com',
        password: hashedPassword,
        role: 'dispatcher'
      },
      {
        name: 'Safety Officer',
        email: 'safety@fleetflow.com',
        password: hashedPassword,
        role: 'safety_officer'
      },
      {
        name: 'Financial Analyst',
        email: 'finance@fleetflow.com',
        password: hashedPassword,
        role: 'financial_analyst'
      }
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create Vehicles
    console.log('🚗 Creating vehicles...');
    const vehicles = await Vehicle.insertMany([
      {
        name: 'Delivery Bike 1',
        licensePlate: 'BIKE-1122',
        type: 'Motorcycle',
        maxCapacity: 50,
        odometer: 15000,
        status: 'Available',
        healthScore: 95,
        acquisitionDate: new Date('2023-01-15'),
        acquisitionCost: 5000
      },
      {
        name: 'Cargo Van 1',
        licensePlate: 'VAN-2891',
        type: 'Van',
        maxCapacity: 1500,
        odometer: 45000,
        status: 'On Trip',
        healthScore: 88,
        acquisitionDate: new Date('2022-06-20'),
        acquisitionCost: 35000
      },
      {
        name: 'Heavy Truck 1',
        licensePlate: 'TRK-1456',
        type: 'Truck',
        maxCapacity: 5000,
        odometer: 120000,
        status: 'Available',
        healthScore: 75,
        acquisitionDate: new Date('2021-03-10'),
        acquisitionCost: 85000
      },
      {
        name: 'Cargo Van 2',
        licensePlate: 'VAN-3421',
        type: 'Van',
        maxCapacity: 1500,
        odometer: 32000,
        status: 'On Trip',
        healthScore: 92,
        acquisitionDate: new Date('2022-11-05'),
        acquisitionCost: 38000
      },
      {
        name: 'Heavy Truck 2',
        licensePlate: 'TRK-9988',
        type: 'Truck',
        maxCapacity: 5000,
        odometer: 85000,
        status: 'Available',
        healthScore: 82,
        acquisitionDate: new Date('2021-09-15'),
        acquisitionCost: 90000
      },
      {
        name: 'Cargo Van 3',
        licensePlate: 'VAN-5634',
        type: 'Van',
        maxCapacity: 1500,
        odometer: 28000,
        status: 'Available',
        healthScore: 94,
        acquisitionDate: new Date('2023-02-20'),
        acquisitionCost: 40000
      },
      {
        name: 'Delivery Bike 2',
        licensePlate: 'BIKE-7788',
        type: 'Motorcycle',
        maxCapacity: 50,
        odometer: 8000,
        status: 'Available',
        healthScore: 98,
        acquisitionDate: new Date('2023-08-10'),
        acquisitionCost: 5500
      },
      {
        name: 'Heavy Truck 3',
        licensePlate: 'TRK-4455',
        type: 'Truck',
        maxCapacity: 5000,
        odometer: 150000,
        status: 'In Shop',
        healthScore: 65,
        acquisitionDate: new Date('2020-05-12'),
        acquisitionCost: 80000
      }
    ]);
    console.log(`✅ Created ${vehicles.length} vehicles`);

    // Create Drivers
    console.log('👨‍✈️ Creating drivers...');
    const drivers = await Driver.insertMany([
      {
        name: 'John Doe',
        email: 'john.doe@fleetflow.com',
        phone: '+1-555-0101',
        licenseNumber: 'DL-001-2024',
        licenseExpiry: new Date('2026-12-31'),
        licenseCategory: 'Truck',
        status: 'On Duty',
        safetyScore: 95,
        tripCompletionRate: 98,
        totalTrips: 245
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@fleetflow.com',
        phone: '+1-555-0102',
        licenseNumber: 'DL-002-2024',
        licenseExpiry: new Date('2027-03-15'),
        licenseCategory: 'Van',
        status: 'On Duty',
        safetyScore: 98,
        tripCompletionRate: 99,
        totalTrips: 312
      },
      {
        name: 'Bob Wilson',
        email: 'bob.wilson@fleetflow.com',
        phone: '+1-555-0103',
        licenseNumber: 'DL-003-2024',
        licenseExpiry: new Date('2026-08-20'),
        licenseCategory: 'Truck',
        status: 'On Duty',
        safetyScore: 92,
        tripCompletionRate: 96,
        totalTrips: 189
      },
      {
        name: 'Alice Chen',
        email: 'alice.chen@fleetflow.com',
        phone: '+1-555-0104',
        licenseNumber: 'DL-004-2024',
        licenseExpiry: new Date('2027-01-10'),
        licenseCategory: 'Motorcycle',
        status: 'On Duty',
        safetyScore: 97,
        tripCompletionRate: 99,
        totalTrips: 428
      },
      {
        name: 'Mike Jones',
        email: 'mike.jones@fleetflow.com',
        phone: '+1-555-0105',
        licenseNumber: 'DL-005-2024',
        licenseExpiry: new Date('2026-11-25'),
        licenseCategory: 'Van',
        status: 'Off Duty',
        safetyScore: 89,
        tripCompletionRate: 94,
        totalTrips: 156
      },
      {
        name: 'Sarah Kim',
        email: 'sarah.kim@fleetflow.com',
        phone: '+1-555-0106',
        licenseNumber: 'DL-006-2024',
        licenseExpiry: new Date('2027-06-30'),
        licenseCategory: 'Truck',
        status: 'On Duty',
        safetyScore: 94,
        tripCompletionRate: 97,
        totalTrips: 203
      }
    ]);
    console.log(`✅ Created ${drivers.length} drivers`);

    // Create Trips
    console.log('🚚 Creating trips...');
    const trips = await Trip.insertMany([
      {
        tripId: 'TRP-0001',
        vehicle: vehicles[1]._id, // VAN-2891
        driver: drivers[0]._id, // John Doe
        origin: 'Warehouse A',
        destination: 'Client Site 1',
        cargoWeight: 1200,
        cargoDescription: 'Electronics shipment',
        status: 'In Progress',
        priority: 'high',
        progress: 75,
        scheduledDate: new Date(),
        startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        estimatedDuration: 180
      },
      {
        tripId: 'TRP-0002',
        vehicle: vehicles[3]._id, // VAN-3421
        driver: drivers[1]._id, // Jane Smith
        origin: 'Warehouse B',
        destination: 'Client Site 2',
        cargoWeight: 800,
        cargoDescription: 'Office supplies',
        status: 'In Progress',
        priority: 'medium',
        progress: 45,
        scheduledDate: new Date(),
        startedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        estimatedDuration: 150
      },
      {
        tripId: 'TRP-0003',
        vehicle: vehicles[2]._id, // TRK-1456
        driver: drivers[2]._id, // Bob Wilson
        origin: 'Warehouse A',
        destination: 'Distribution Center',
        cargoWeight: 4500,
        cargoDescription: 'Bulk goods',
        status: 'Draft',
        priority: 'high',
        progress: 0,
        scheduledDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        estimatedDuration: 240
      },
      {
        tripId: 'TRP-0004',
        vehicle: vehicles[4]._id, // TRK-9988
        driver: drivers[5]._id, // Sarah Kim
        origin: 'Warehouse C',
        destination: 'Client Site 3',
        cargoWeight: 3200,
        cargoDescription: 'Construction materials',
        status: 'Draft',
        priority: 'medium',
        progress: 0,
        scheduledDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
        estimatedDuration: 200
      },
      {
        tripId: 'TRP-0005',
        vehicle: vehicles[0]._id, // BIKE-1122
        driver: drivers[3]._id, // Alice Chen
        origin: 'Downtown Hub',
        destination: 'Residential Area',
        cargoWeight: 25,
        cargoDescription: 'Documents and small packages',
        status: 'Completed',
        priority: 'low',
        progress: 100,
        scheduledDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
        estimatedDuration: 60
      }
    ]);
    console.log(`✅ Created ${trips.length} trips`);

    // Create Maintenance Records
    console.log('🔧 Creating maintenance records...');
    const maintenance = await Maintenance.insertMany([
      {
        vehicle: vehicles[7]._id, // TRK-4455 (In Shop)
        type: 'Urgent',
        description: 'Engine overheating issue',
        status: 'In Progress',
        scheduledDate: new Date(),
        estimatedCost: 2500
      },
      {
        vehicle: vehicles[2]._id, // TRK-1456
        type: 'Scheduled',
        description: 'Regular oil change and inspection',
        status: 'Pending',
        scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        estimatedCost: 350
      },
      {
        vehicle: vehicles[1]._id, // VAN-2891
        type: 'Scheduled',
        description: 'Tire rotation and brake check',
        status: 'Pending',
        scheduledDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        estimatedCost: 200
      }
    ]);
    console.log(`✅ Created ${maintenance.length} maintenance records`);

    // Create Expenses
    console.log('💰 Creating expenses...');
    const expenses = await Expense.insertMany([
      {
        vehicle: vehicles[1]._id,
        type: 'Fuel',
        amount: 85.50,
        quantity: 45,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        description: 'Fuel refill'
      },
      {
        vehicle: vehicles[2]._id,
        type: 'Fuel',
        amount: 120.00,
        quantity: 60,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        description: 'Fuel refill'
      },
      {
        vehicle: vehicles[7]._id,
        type: 'Maintenance',
        amount: 1500.00,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        description: 'Engine repair parts'
      },
      {
        vehicle: vehicles[3]._id,
        type: 'Fuel',
        amount: 75.25,
        quantity: 40,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        description: 'Fuel refill'
      },
      {
        vehicle: vehicles[0]._id,
        type: 'Maintenance',
        amount: 150.00,
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        description: 'Chain and brake service'
      }
    ]);
    console.log(`✅ Created ${expenses.length} expenses`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Manager: manager@fleetflow.com / password123');
    console.log('Dispatcher: dispatcher@fleetflow.com / password123');
    console.log('Safety Officer: safety@fleetflow.com / password123');
    console.log('Financial Analyst: finance@fleetflow.com / password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
};

// Run the seed
connectDB().then(() => {
  seedData();
});
