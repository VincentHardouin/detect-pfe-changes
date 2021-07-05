require('dotenv').config();

module.exports = (function () {
  const config = {
    idProject: process.env.ID_PROJECT,
    credentials: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
    discord: {
      webhook: process.env.DISCORD_WEBHOOK,
    },
    schedule: process.env.SCHEDULE,
  };
  return config;
})();
