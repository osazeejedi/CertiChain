const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const certificateRoutes = require('./routes/certificates');

dotenv.config({ path: '../.env' });

const app = express();

// Middleware
app.use(express.json());

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Could not connect to PostgreSQL', err));

// Routes
app.use('/api/certificates', certificateRoutes);

// Sync database
sequelize.sync({ force: true })
  .then(() => console.log('Database tables created'))
  .catch(err => console.error('Error creating database tables:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));