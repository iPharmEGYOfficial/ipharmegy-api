require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const healthRoute = require("./src/routes/health.route");
const summaryRoute = require("./src/routes/summary.route");
const dbTestRoute = require("./src/routes/dbtest.route");
const exploreRoute = require("./src/routes/explore.route");
const shamelReadonlyRoute = require("./src/routes/shamel.readonly.route");

app.use("/api/health", healthRoute);
app.use("/api/smart-summary", summaryRoute);
app.use("/api/dbtest", dbTestRoute);
app.use("/api/explore", exploreRoute);
app.use("/api/shamel", shamelReadonlyRoute);

app.get("/", (req, res) => {
  res.json({
    system: "iPharmEGY API",
    status: "RUNNING",
    mode: "READ_ONLY"
  });
});

const PORT = process.env.PORT || 4010;

app.listen(PORT, () => {
  console.log("iPharmEGY API running on http://localhost:" + PORT);
});