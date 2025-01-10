const axios = require("axios");

const fetchCryptoData = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,matic-network,ethereum";

  try {
    const response = await axios.get(url);
    return response.data; // Return the array of crypto data
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);
    throw new Error("Failed to fetch data from CoinGecko");
  }
};

module.exports = { fetchCryptoData };
