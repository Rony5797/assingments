const express = require('express');
const router = express.Router();
const Product = require('../models/product');



router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
