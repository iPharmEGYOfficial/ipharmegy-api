const express = require("express");
const sql = require("msnodesqlv8");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const connectionString =
      "server=localhost\\SQLEXPRESS;" +
      "Database=iPharmEGY_Taif_Main;" +
      "Trusted_Connection=Yes;" +
      "Driver={SQL Server Native Client 11.0};" +
      "TrustServerCertificate=Yes;";

    sql.query(connectionString, "SELECT DB_NAME() AS CurrentDatabase, GETDATE() AS ServerTime", (err, rows) => {
      if (err) {
        return res.status(500).json({
          status: "ERROR",
          message: err.message
        });
      }

      res.json({
        status: "OK",
        data: rows
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