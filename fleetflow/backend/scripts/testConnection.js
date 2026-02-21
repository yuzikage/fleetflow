require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const testConnection = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully!');

    // Test creating a user
    console.log('\nTesting user creation...');
    const testUser = await User.create({
      name: 'Test User',
      email: 'test' + Date.now() + '@example.com',
      password: 'hashedpassword123',
      role: 'manager'
    });
    console.log('✅ User created:', testUser);

    // Test finding users
    console.log('\nFinding all users...');
    const users = await User.find();
    console.log(`Found ${users.length} users in database`);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.role}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testConnection();
