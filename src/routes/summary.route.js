const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    totalSales: 125000,
    totalOrders: 320,
    topItem: "Panadol",
    estimatedProfit: 25000,
    message: "Smart summary mock data"
  });
});

module.exports = router;
