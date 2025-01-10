const Crypto = require("../model/cryptoSchema");
const { fetchCryptoData } = require('../services/cryptoServices');

const updateCryptoData = async () => {
  console.log("Running updateCryptoData job...");

  try {
    const cryptoData = await fetchCryptoData();

    for (const coin of cryptoData) {
      await Crypto.findOneAndUpdate(
        { symbol: coin.symbol }, // Match by symbol
        {
          name: coin.name,
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          last_updated: new Date(),
        },
        { upsert: true, new: true } // Create if not found
      );
    }

    console.log("Crypto data updated successfully!");
  } catch (error) {
    console.error("Error updating crypto data:", error);
  }
};

module.exports = { updateCryptoData };
