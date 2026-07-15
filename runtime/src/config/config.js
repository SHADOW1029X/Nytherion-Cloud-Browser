require("dotenv").config();

module.exports = {
  port: parseInt(process.env.PORT || "3000", 10),

  chrome: {
    executablePath: process.env.CHROME_PATH,
    profileDir: process.env.PROFILE_DIR,
  },

  logging: {
    level: process.env.LOG_LEVEL || "info",
  },
};
