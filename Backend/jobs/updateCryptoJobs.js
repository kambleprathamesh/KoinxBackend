

const Crypto = require("../model/cryptoSchema");
const { fetchCryptoData } = require("../services/cryptoServices");

const updateCryptoData = async () => {
  console.log("Running updateCryptoData job...");

  try {
    const cryptoData = await fetchCryptoData();

    for (const coin of Object.keys(cryptoData)) {
      const { usd: current_price } = cryptoData[coin];
      const market_cap = cryptoData[coin].usd_market_cap;
      const price_change_percentage_24h = cryptoData[coin].usd_24h_change;

      const crypto = await Crypto.findOneAndUpdate(
        { symbol: coin },
        {
          name: coin,
          current_price,
          market_cap,
          price_change_percentage_24h,
          last_updated: new Date(),
        },
        { upsert: true, new: true }
      );

      // Update priceHistory with the current price
      if (crypto) {
        crypto.priceHistory.push({ price: current_price });

        // Ensure the history doesn't exceed 100 records
        if (crypto.priceHistory.length > 100) {
          crypto.priceHistory.shift(); // Remove the oldest entry
        }

        await crypto.save();
      }
    }

    console.log("Crypto data updated successfully!");
  } catch (error) {
    console.error("Error updating crypto data:", error);
  }
};

module.exports = { updateCryptoData };
