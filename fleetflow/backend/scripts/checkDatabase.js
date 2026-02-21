require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Maintenance = require('../models/Maintenance');

const checkDatabase = async () => {
  try {
    console.log('🔍 Checking Database Connection...\n');
    console.log('MongoDB URI:', process.env.MONGO_URI.replace(/:[^:@]+@/, ':****@'));
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully!\n');

    // Check connection details
    console.log('📊 Connection Details:');
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Ready State: ${mongoose.connection.readyState} (1 = connected)\n`);

    // Check collections
    console.log('📦 Collections Status:');
    
    const userCount = await User.countDocuments();
    console.log(`   Users: ${userCount} documents`);
    
    const vehicleCount = await Vehicle.countDocuments();
    console.log(`   Vehicles: ${vehicleCount} documents`);
    
    const maintenanceCount = await Maintenance.countDocuments();
    console.log(`   Maintenance: ${maintenanceCount} documents\n`);

    // Show sample data
    if (userCount > 0) {
      console.log('👥 Sample Users:');
      const users = await User.find().limit(5).select('name email role');
      users.forEach(user => {
        console.log(`   - ${user.name} (${user.email}) - ${user.role}`);
      });
      console.log('');
    }

    if (vehicleCount > 0) {
      console.log('🚗 Sample Vehicles:');
      const vehicles = await Vehicle.find().limit(5).select('name licensePlate type status');
      vehicles.forEach(vehicle => {
        console.log(`   - ${vehicle.name} (${vehicle.licensePlate}) - ${vehicle.type} - ${vehicle.status}`);
      });
      console.log('');
    }

    // Check indexes
    console.log('🔑 Indexes:');
    const userIndexes = await User.collection.getIndexes();
    console.log(`   Users: ${Object.keys(userIndexes).join(', ')}`);
    
    const vehicleIndexes = await Vehicle.collection.getIndexes();
    console.log(`   Vehicles: ${Object.keys(vehicleIndexes).join(', ')}\n`);

    console.log('✅ Database check complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
};

checkDatabase();
