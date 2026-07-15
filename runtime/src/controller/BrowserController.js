const chrome = require('../browser/ChromeManager');

module.exports = {
  start: () => chrome.start(),
  stop: () => chrome.stop(),
  status: () => ({
    running: chrome.isRunning()
  })
};
