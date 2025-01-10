const Crypto = require("../model/cryptoSchema");
const { fetchCryptoData } = require("../services/cryptoServices");
// Fetch all cryptocurrency data
const getAllCryptoData = async (req, res) => {
  try {
    const cryptoData = await Crypto.find({});
    res.status(200).json({ success: true, data: cryptoData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch crypto data" });
  }
};

const getCryptoStats = async (req, res) => {
  const { coin } = req.query; // Extract 'coin' query parameter

  // Validate the 'coin' parameter
  if (!coin || !["bitcoin", "matic-network", "ethereum"].includes(coin)) {
    return res.status(400).json({
      success: false,
      message:
        "Invalid coin. Please choose one of: bitcoin, matic-network, ethereum.",
    });
  }

  try {
    // Fetch the crypto data using the service
    const data = await fetchCryptoData();
    console.log("data", data);

    // Extract data for the requested coin
    const coinData = data[coin];
    console.log("coinData", coinData);
    if (!coinData) {
      return res.status(404).json({
        success: false,
        message: "Coin data not found",
      });
    }

    // Format the response
    const response = {
      price: coinData.usd,
      marketCap: coinData.usd_market_cap,
      "24hChange": coinData.usd_24h_change,
    };

    console.log("REPONSE", response);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data from CoinGecko",
    });
  }
};

const calculateStandardDeviation = (prices) => {
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const variance =
    prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
    prices.length;
  return Math.sqrt(variance).toFixed(2); // Return with 2 decimal places
};

const getStandardDeviation = async (req, res) => {
  const { coin } = req.query;

  try {
    // Fetch the coin data from the database
    const crypto = await Crypto.findOne({ name: coin });

    console.log("Crypto in deviation", crypto);

    if (!crypto || crypto.priceHistory.length === 0) {
      return res
        .status(404)
        .json({ message: `No data found for cryptocurrency: ${coin}` });
    }

    // Check if the priceHistory has less than 2 records
    if (crypto.priceHistory.length < 2) {
      return res.status(200).json({ deviation: "0.00" });
    }
    // Extract the last 100 prices or fewer
    const last100Prices = crypto.priceHistory
      .slice(-100) // Take the last 100 entries
      .map((record) => record.price);

    console.log("last100Prices", last100Prices);
    // Calculate the standard deviation
    const deviation = calculateStandardDeviation(last100Prices);
    console.log("deviation", deviation);
    return res.status(200).json({ deviation });
  } catch (error) {
    console.error("Error calculating standard deviation:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

module.exports = {
  getAllCryptoData,
  getCryptoStats,
  getStandardDeviation,
};
