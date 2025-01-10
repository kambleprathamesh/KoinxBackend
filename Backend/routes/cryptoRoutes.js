const express = require("express");
const { getAllCryptoData } = require("../controller/crypto");

const router = express.Router();

// Define routes for cryptocurrencies
router.get("/getCryptoData", getAllCryptoData);

module.exports = router;
