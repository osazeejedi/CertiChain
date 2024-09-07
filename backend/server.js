const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const certificateRoutes = require('./backend/routes/certificates');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/certificates', certificateRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));