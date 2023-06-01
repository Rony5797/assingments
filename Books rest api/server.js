// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config();


// Create an Express application
const app = express();

// application middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());

// routes middleware
app.use("/api/v1", require("./routes/books"))

// Port number
const port = process.env.PORT || 8000;

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => 
  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  }))
  .catch(err => console.error('Failed to connect to MongoDB', err));