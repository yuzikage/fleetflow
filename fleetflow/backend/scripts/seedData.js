require('dotenv').config();
const mongoose = require('mongoose');
const Vehicle = require('../models/Vehicle');
const Maintenance = require('../models/Maintenance');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Vehicle.deleteMany({});
    await Maintenance.deleteMany({});

    // Create vehicles
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

    console.log(`${vehicles.length} vehicles created`);

    // Create maintenance records
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
    console.log(`${maintenanceRecords.length} maintenance records created`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
