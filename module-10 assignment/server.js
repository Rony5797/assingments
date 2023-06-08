const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const productRoute = require('./routes/product');
const usersRoute = require('./routes/users');
const authenticate = require('./middlewares/authenticate');


// middlewares
app.use(express.json())
app.use(cors())

//router routes
app.use('/api/v1', usersRoute);
app.use(authenticate);
app.use('/api/v1', productRoute);

// port definitions
const port = process.env.PORT || 8000;


// datacase configuration
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port: ${port} `);
      });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


