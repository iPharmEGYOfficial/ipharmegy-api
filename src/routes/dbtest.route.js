const express = require("express");
const sql = require("mssql");
const dbConfig = require("../config/db.config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);

    const result = await pool.request().query(`
      SELECT DB_NAME() AS CurrentDatabase, GETDATE() AS ServerTime
    `);

    res.json({
      status: "OK",
      data: result.recordset
    });

  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: err.message
    });
  }
});

module.exports = router;
