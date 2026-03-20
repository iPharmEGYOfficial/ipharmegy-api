const express = require("express");
const sql = require("msnodesqlv8");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const connectionString =
      "Driver={ODBC Driver 18 for SQL Server};" +
      "Server=localhost\\SQLEXPRESS;" +
      "Database=AMANSOFTS_PLUS;" +
      "Trusted_Connection=Yes;" +
      "TrustServerCertificate=Yes;";

    const summaryQuery = `
      SELECT
        COUNT(*) AS TotalOrders,
        SUM(ISNULL(SP_S_TOT_FORIGNVALUE, 0)) AS TotalSales,
        SUM(ISNULL(SP_S_REBH, 0)) AS EstimatedProfit
      FROM SAL_POINT_INV
    `;

    const topSellingQuery = `
      SELECT TOP 10
        d.CLS_ID,
        c.CLS_ARNAME AS ItemNameAr,
        SUM(ISNULL(d.SP_SD_QLT, 0)) AS TotalQty,
        SUM(ISNULL(d.SP_SD_TOT_FORIGNVALUE, 0)) AS TotalSales
      FROM SAL_POINT_INV_DET d
      LEFT JOIN CLASSES c
        ON d.CLS_ID = c.CLS_ID
      GROUP BY d.CLS_ID, c.CLS_ARNAME
      ORDER BY TotalQty DESC
    `;

    sql.query(connectionString, summaryQuery, (err1, summaryRows) => {
      if (err1) {
        return res.status(500).json({
          status: "ERROR",
          message: err1.message
        });
      }

      sql.query(connectionString, topSellingQuery, (err2, topRows) => {
        if (err2) {
          return res.status(500).json({
            status: "ERROR",
            message: err2.message
          });
        }

        const s = summaryRows[0] || {};

        res.json({
          status: "OK",
          totalSales: s.TotalSales || 0,
          totalOrders: s.TotalOrders || 0,
          estimatedProfit: s.EstimatedProfit || 0,
          topSelling: topRows || [],
          deadStock: 0,
          lowStock: 0
        });
      });
    });

  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
});

module.exports = router;