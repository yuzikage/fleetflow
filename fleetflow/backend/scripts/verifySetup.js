require('dotenv').config();
const mongoose = require('mongoose');

const verifySetup = async () => {
  console.log('🔍 FleetFlow Setup Verification\n');
  console.log('=' .repeat(50));

  // Check environment variables
  console.log('\n📋 Environment Variables:');
  const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'JWT_EXPIRE'];
  let envVarsOk = true;

  requiredEnvVars.forEach(varName => {
    if (process.env[varName]) {
      console.log(`✅ ${varName}: Set`);
    } else {
      console.log(`❌ ${varName}: Missing`);
      envVarsOk = false;
    }
  });

  if (!envVarsOk) {
    console.log('\n❌ Some environment variables are missing!');
    process.exit(1);
  }

  // Check database connection
  console.log('\n🗄️  Database Connection:');
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connection successful');
    console.log(`   Host: ${mongoose.connection.host}`);
    console.log(`   Database: ${mongoose.connection.name}`);

    // Check collections
    console.log('\n📊 Database Collections:');
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    const expectedCollections = ['users', 'vehicles', 'drivers', 'trips', 'maintenances', 'expenses'];
    expectedCollections.forEach(name => {
      if (collectionNames.includes(name)) {
        console.log(`✅ ${name} collection exists`);
      } else {
        console.log(`⚠️  ${name} collection not found (run seed script)`);
      }
    });

    // Check data counts
    console.log('\n📈 Data Counts:');
    const User = require('../models/User');
    const Vehicle = require('../models/Vehicle');
    const Driver = require('../models/Driver');
    const Trip = require('../models/Trip');
    const Maintenance = require('../models/Maintenance');
    const Expense = require('../models/Expense');

    const counts = {
      Users: await User.countDocuments(),
      Vehicles: await Vehicle.countDocuments(),
      Drivers: await Driver.countDocuments(),
      Trips: await Trip.countDocuments(),
      Maintenance: await Maintenance.countDocuments(),
      Expenses: await Expense.countDocuments()
    };

    Object.entries(counts).forEach(([name, count]) => {
      if (count > 0) {
        console.log(`✅ ${name}: ${count} records`);
      } else {
        console.log(`⚠️  ${name}: 0 records (run seed script)`);
      }
    });

    // Check for test users
    console.log('\n👥 Test Users:');
    const testEmails = [
      'manager@fleetflow.com',
      'dispatcher@fleetflow.com',
      'safety@fleetflow.com',
      'finance@fleetflow.com'
    ];

    for (const email of testEmails) {
      const user = await User.findOne({ email });
      if (user) {
        console.log(`✅ ${user.role}: ${email}`);
      } else {
        console.log(`⚠️  ${email} not found`);
      }
    }

    // Check available resources
    console.log('\n🚗 Available Resources:');
    const availableVehicles = await Vehicle.countDocuments({ status: 'Available' });
    const onDutyDrivers = await Driver.countDocuments({ status: 'On Duty' });
    const draftTrips = await Trip.countDocuments({ status: 'Draft' });
    const activeTrips = await Trip.countDocuments({ status: { $in: ['Dispatched', 'In Progress'] } });

    console.log(`✅ Available Vehicles: ${availableVehicles}`);
    console.log(`✅ On Duty Drivers: ${onDutyDrivers}`);
    console.log(`✅ Draft Trips: ${draftTrips}`);
    console.log(`✅ Active Trips: ${activeTrips}`);

    // Final summary
    console.log('\n' + '='.repeat(50));
    if (counts.Users > 0 && counts.Vehicles > 0 && counts.Drivers > 0) {
      console.log('✅ Setup verification PASSED');
      console.log('\n🚀 You can now start the server with: npm run dev');
      console.log('🌐 Frontend should connect to: http://localhost:5000/api');
      console.log('\n📝 Test credentials:');
      console.log('   Email: dispatcher@fleetflow.com');
      console.log('   Password: password123');
    } else {
      console.log('⚠️  Setup incomplete - run seed script:');
      console.log('   npm run seed:test');
    }

  } catch (error) {
    console.log('❌ Database connection failed');
    console.log(`   Error: ${error.message}`);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Check MONGO_URI in .env file');
    console.log('   2. Verify MongoDB Atlas credentials');
    console.log('   3. Ensure your IP is whitelisted');
    console.log('   4. Check internet connection');
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Verification complete\n');
  }
};

verifySetup();
