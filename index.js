const cron = require('node-cron');
const config = require('./config');
const sendMessageToDiscord = require('./send-message-to-discord');
const checkDifferences = require('./checkDifferences');

async function main() {
  cron.schedule(config.schedule, async () => {
    await checkDifferences(sendMessageToDiscord);
  });
}

main();
