const express = require("express");
const sql = require("msnodesqlv8");

const router = express.Router();

router.get("/tables", async (req, res) => {
  try {
    const connectionString =
      "Driver={ODBC Driver 18 for SQL Server};" +
      "Server=localhost\\SQLEXPRESS;" +
      "Database=AMANSOFTS_PLUS;" +
      "Trusted_Connection=Yes;" +
      "TrustServerCertificate=Yes;";

    const query = `
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `;

    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        return res.status(500).json({ status: "ERROR", message: err.message });
      }

      res.json({
        status: "OK",
        tables: rows
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
