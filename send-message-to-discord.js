const axios = require('axios');
const config = require('./config');

module.exports = function sendMessage(message) {
  return axios.post(config.discord.webhook, { content: message });
}
