require("dotenv").config();

module.exports = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
    encrypt: true
  }
};
