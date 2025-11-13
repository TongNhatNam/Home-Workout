const dotenv = require('dotenv');
const connectDB = require('../config/database');
const { seedDatabase } = require('../utils/seedData');

// Load env vars
dotenv.config();

const runSeed = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Run seed
    await seedDatabase();
    
    console.log('✅ Seed hoàn thành!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed thất bại:', error);
    process.exit(1);
  }
};

runSeed();