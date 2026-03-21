const express = require("express");
const reader = require("../services/shamel.reader");

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const summary = await reader.getSummary();
    const topSelling = await reader.getTopSelling(10);

    res.json({
      status: "OK",
      ...summary,
      topSelling
    });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
});

router.get("/top-selling", async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const data = await reader.getTopSelling(limit);

    res.json({
      status: "OK",
      data
    });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
});

router.get("/sales/recent", async (req, res) => {
  try {
    const limit = req.query.limit || 20;
    const data = await reader.getRecentSales(limit);

    res.json({
      status: "OK",
      data
    });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
});

module.exports = router;
