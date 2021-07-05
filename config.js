require('dotenv').config();

module.exports = (function() {
  const config = {
    idProject: process.env.ID_PROJECT,
    credentials: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    }
  }
  return config;
})();
