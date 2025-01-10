const Crypto = require("../model/cryptoSchema");
const { fetchCryptoData } = require("../services/cryptoServices");

const updateCryptoData = async () => {
  console.log("Running updateCryptoData job...");

  try {
    const cryptoData = await fetchCryptoData();
    console.log(cryptoData);

    // Iterate over the keys of the object using Object.entries()
    for (const [coinId, coinData] of Object.entries(cryptoData)) {
      await Crypto.findOneAndUpdate(
        { symbol: coinId }, // Match by symbol (coinId like 'bitcoin', 'matic-network', etc.)
        {
          name: coinId, // Using coinId as name (optional: you can map it to actual names)
          current_price: coinData.usd,
          market_cap: coinData.usd_market_cap,
          price_change_percentage_24h: coinData.usd_24h_change,
          last_updated: new Date(),
        },
        { upsert: true, new: true } // Create if not found, update if found
      );
    }

    console.log("Crypto data updated successfully!");
  } catch (error) {
    console.error("Error updating crypto data:", error);
  }
};
module.exports = { updateCryptoData };
