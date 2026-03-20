require("dotenv").config();

module.exports = {
  connectionString:
    "server=" + process.env.DB_SERVER +
    ";Database=" + process.env.DB_NAME +
    ";Trusted_Connection=Yes;" +
    "Driver={SQL Server Native Client 11.0};" +
    "TrustServerCertificate=Yes;"
};