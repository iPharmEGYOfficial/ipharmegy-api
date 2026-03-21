const sql = require("msnodesqlv8");

const connectionString =
  "Driver={ODBC Driver 18 for SQL Server};" +
  "Server=localhost\\SQLEXPRESS;" +
  "Database=AMANSOFTS_PLUS;" +
  "Trusted_Connection=Yes;" +
  "TrustServerCertificate=Yes;";

function queryAsync(query) {
  return new Promise((resolve, reject) => {
    sql.query(connectionString, query, (err, rows) => {
      if (err) return reject(err);
      resolve(rows || []);
    });
  });
}

async function getSummary() {
  const summaryQuery = `
    SELECT
      COUNT(*) AS TotalOrders,
      SUM(ISNULL(SP_S_TOT_FORIGNVALUE, 0)) AS TotalSales,
      SUM(ISNULL(SP_S_REBH, 0)) AS EstimatedProfit
    FROM SAL_POINT_INV
  `;

  const rows = await queryAsync(summaryQuery);
  const s = rows[0] || {};

  return {
    totalOrders: Number(s.TotalOrders || 0),
    totalSales: Number(s.TotalSales || 0),
    estimatedProfit: Number(s.EstimatedProfit || 0),
    deadStock: 0,
    lowStock: 0
  };
}

async function getTopSelling(limit = 10) {
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;

  const query = `
    SELECT TOP ${safeLimit}
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

  const rows = await queryAsync(query);

  return rows.map((r) => ({
    CLS_ID: r.CLS_ID,
    ItemNameAr: r.ItemNameAr,
    TotalQty: Number(r.TotalQty || 0),
    TotalSales: Number(r.TotalSales || 0)
  }));
}

async function getRecentSales(limit = 20) {
  const safeLimit = Number(limit) > 0 ? Number(limit) : 20;

  const query = `
    SELECT TOP ${safeLimit}
      SP_S_ID,
      SP_S_DATE,
      CUS_ARNAME,
      SP_S_TOT_FORIGNVALUE,
      SP_S_REBH
    FROM SAL_POINT_INV
    ORDER BY SP_S_DATE DESC, SP_S_ID DESC
  `;

  const rows = await queryAsync(query);

  return rows.map((r) => ({
    invoiceId: r.SP_S_ID,
    saleDate: r.SP_S_DATE,
    customerName: r.CUS_ARNAME,
    totalSales: Number(r.SP_S_TOT_FORIGNVALUE || 0),
    estimatedProfit: Number(r.SP_S_REBH || 0)
  }));
}

module.exports = {
  getSummary,
  getTopSelling,
  getRecentSales
};
