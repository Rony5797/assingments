const sales = require("../model/salesModel");
const expense = require("../model/expenseModel");

exports.totalRevenue = async (req, res) => {
  try {
    const totalRevenue = await sales.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    res.status(200).json({ totalRevenue: totalRevenue[0].total });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.quantityByProduct = async (req, res) => {
  try {
    const quantityByProduct = await sales.aggregate([
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);
    res.status(200).json(quantityByProduct);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.topProducts = async (req, res) => {
  try {
    const topProducts = await sales.aggregate([
      {
        $group: {
          _id: "$product",
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    res.status(200).json(topProducts);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.averagePrice = async (req, res) => {
  try {
    const averagePrice = await sales.aggregate([
      {
        $group: {
          _id: null,
          average: { $avg: "$price" },
        },
      },
    ]);
    res.status(200).json({ averagePrice: averagePrice[0].average });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.revenueByMonth = async (req, res) => {
  try {
    const revenueByMonth = await sales.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    res.status(200).json(revenueByMonth);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.highestQuantitySold = async (req, res) => {
  try {
    const highestQuantitySold = await sales.aggregate([
      {
        $group: {
          _id: "$product",
          maxQuantity: { $max: "$quantity" },
        },
      },
      {
        $sort: { maxQuantity: -1 },
      },
      {
        $limit: 2,
      },
    ]);
    res.status(200).json(highestQuantitySold);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.departmentSalaryExpense = async (req, res) => {
  try {
    // Calculate total revenue
    const totalRevenue = await sales.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);

    // Calculate total departmental expenses
    const departmentExpenses = await expense.aggregate([
      {
        $group: {
          _id: "$department",
          totalExpense: { $sum: "$salary" }, // Adjust this based on your data schema
        },
      },
    ]);

    // Calculate total revenue after deducting department expenses
    const totalRevenueAfterExpense =
      totalRevenue[0].total -
      departmentExpenses.reduce(
        (total, departmentExpense) => total + departmentExpense.totalExpense,
        0
      );

    res.status(200).json({ totalRevenueAfterExpense });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
