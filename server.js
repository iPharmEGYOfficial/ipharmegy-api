require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const healthRoute = require("./src/routes/health.route");
const summaryRoute = require("./src/routes/summary.route");

app.use("/api/health", healthRoute);
app.use("/api/smart-summary", summaryRoute);

// Root
app.get("/", (req, res) => {
  res.json({
    system: "iPharmEGY API",
    status: "RUNNING"
  });
});

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => {
  console.log(`iPharmEGY API running on http://localhost:${PORT}`);
});
