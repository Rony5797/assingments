const mongoose = require('mongoose');


const salesSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number,
  date: Date,
});

const sales = mongoose.model('sales', salesSchema);

module.exports = sales;