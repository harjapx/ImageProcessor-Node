const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory in the 'workers' folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/', routes);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectToDatabase();

module.exports = app;
