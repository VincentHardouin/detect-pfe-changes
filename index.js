const sendMessageToDiscord = require('./send-message-to-discord');
const checkDifferences = require('./checkDifferences');

async function main() {
  await checkDifferences(sendMessageToDiscord);
}

main();
