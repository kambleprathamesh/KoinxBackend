

const axios = require("axios");

const fetchCryptoData = async () => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,matic-network,ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true";

  try {
    const response = await axios.get(url);
    console.log(response.data); // Log the response to see the data

    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error);
    throw new Error("Failed to fetch data from CoinGecko");
  }
};

module.exports = { fetchCryptoData };
