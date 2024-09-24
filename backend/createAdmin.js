const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const MONGO_URI = 'mongodb+srv://guvi:guvi@guvi.qgrirnt.mongodb.net/yourdb'; // Your MongoDB URI

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10); // Replace with your desired password
    const admin = new User({
      name: 'Admin',
      email: 'admin@email.com',
      password: hashedPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
