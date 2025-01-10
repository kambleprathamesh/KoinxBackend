const Crypto = require("../model/cryptoSchema");

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

module.exports = {
  getAllCryptoData,
};
