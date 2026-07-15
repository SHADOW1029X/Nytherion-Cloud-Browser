const express = require("express");
const config = require("./src/config/config");
const browserController = require("./src/controller/BrowserController");

const app = express();

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Nytherion Browser Runtime",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.post("/browser/start", async (req, res) => {
  try {
    await browserController.start();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post("/browser/stop", async (req, res) => {
  try {
    await browserController.stop();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get("/browser/status", (req, res) => {
  res.json(browserController.status());
});

app.listen(config.port, () => {
  console.log("=================================");
  console.log("Nytherion Browser Runtime");
  console.log("=================================");
  console.log(`Running on port ${config.port}`);
  console.log(`Health: http://localhost:${config.port}/health`);
  console.log("=================================");
});
