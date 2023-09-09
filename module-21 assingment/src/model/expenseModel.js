const mongoose = require("mongoose");

const departmentExpenses = new mongoose.Schema({
  department: String,
  salary: Number,
});

const expense = mongoose.model("departmentExpenses", departmentExpenses);

module.exports = expense;
