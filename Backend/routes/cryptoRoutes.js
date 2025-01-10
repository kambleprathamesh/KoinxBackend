const express = require("express");
const {
  getAllCryptoData,
  getCryptoStats,
  getStandardDeviation,
} = require("../controller/crypto");

const router = express.Router();

// Define routes for cryptocurrencies
router.get("/getCryptoData", getAllCryptoData);
router.get("/stats", getCryptoStats);
router.get("/deviation", getStandardDeviation);

module.exports = router;
