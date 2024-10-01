const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to MySQL
connectDB();

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

// Middleware to handle JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Define the PORT
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
