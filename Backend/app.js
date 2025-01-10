const express = require("express");
const cors = require("cors");
const startApp = require("./application");
const cryptoRoutes = require("./routes/cryptoRoutes");
require("dotenv").config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Crypto Tracker API is running !" });
});

// API Routes
app.use("/api/v1/crypto", cryptoRoutes);

const PORT = process.env.PORT || 5000;

startApp()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the application:", error);
    process.exit(1);
  });
