const express = require("express");
const {
  totalRevenue,
  quantityByProduct,
  topProducts,
  averagePrice,
  revenueByMonth,
  highestQuantitySold,
  departmentSalaryExpense,
} = require("../controller/salesController");
const router = express.Router();

router.get("/total-revenue", totalRevenue);
router.get("/quantity-by-product", quantityByProduct);
router.get("/top-products", topProducts);
router.get("/average-price", averagePrice);
router.get("/revenue-by-month", revenueByMonth);
router.get("/highest-quantity-sold", highestQuantitySold);
router.get("/department-salary-expense", departmentSalaryExpense);

module.exports = router;
