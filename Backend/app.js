const connectDB = require("./config/database");
const { updateCryptoData } = require("./jobs/updateCryptoJobs");
const cron = require("node-cron");

const startApp = async () => {
  await connectDB(); // Connect to MongoDB

  // Run the updateCryptoData function immediately when the app starts
  updateCryptoData();
  console.log("Ran updateCrypto Data for the first time");

  // Get the current time
  const now = new Date();

  // Calculate the next time to run the job (2 hours from now)
  const nextRunTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  // Schedule the job to run every 2 hours
  cron.schedule(
    `0 ${nextRunTime.getHours()} */2 * * *`, // This expression means every 2 hours
    updateCryptoData
  );

  console.log("Crypto Tracker app is running!");
};

module.exports = startApp;
