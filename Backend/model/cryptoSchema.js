
const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true, unique: true },
  current_price: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  price_change_percentage_24h: { type: Number, required: true },
  last_updated: { type: Date, default: Date.now },
  priceHistory: [
    {
      price: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Crypto", cryptoSchema);
