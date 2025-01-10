const connectDB = require("./config/database");
const { updateCryptoData } = require("./jobs/updateCryptoJobs");
const cron = require("node-cron");

const startApp = async () => {
  await connectDB(); // Connect to MongoDB

  // Run the updateCryptoData function immediately when the app starts
  updateCryptoData();
  console.log("Runned updateCrypto Data for first time");

  // Get the current time
  const now = new Date();
  // Calculate the next time to run the job (24 hours from now)
  const nextRunTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // Schedule the job to run 24 hours from now, and repeat every 24 hours
  cron.schedule(
    `${nextRunTime.getMinutes()} ${nextRunTime.getHours()} * * *`,
    updateCryptoData
  );

  console.log("Crypto Tracker app is running!");
};

module.exports = startApp;
