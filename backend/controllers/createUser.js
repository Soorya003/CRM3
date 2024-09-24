const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User'); 
const readline = require('readline');

dotenv.config(); 

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the .env file');
  process.exit(1);
}

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter user name: ', async (name) => {
      rl.question('Enter user email: ', async (email) => {
        rl.question('Enter user password: ', async (password) => {
          rl.question('Enter user role (e.g., admin, user): ', async (role) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt); // Hash password

            const newUser = new User({
              name,
              email,
              password: hashedPassword,
              role
            });

            await newUser.save();
            console.log('User created');
            mongoose.disconnect();
            rl.close();
          });
        });
      });
    });
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.disconnect();
  });
