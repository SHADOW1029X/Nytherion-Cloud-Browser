const { chromium } = require('playwright');
const path = require('path');
const config = require('../config/config');

class ChromeManager {
  constructor() {
    this.context = null;
    this.page = null;
  }

  async start() {
    if (this.context) {
      console.log('Chrome is already running.');
      return;
    }

    const profileDir = path.resolve(config.chrome.profileDir);

    this.context = await chromium.launchPersistentContext(profileDir, {
      executablePath: config.chrome.executablePath,
      headless: false,
      args: [
        '--no-first-run',
        '--no-default-browser-check'
      ]
    });

    const pages = this.context.pages();
    this.page = pages.length ? pages[0] : await this.context.newPage();

    console.log('✅ Google Chrome started.');
  }

  async stop() {
    if (!this.context) {
      return;
    }

    await this.context.close();

    this.context = null;
    this.page = null;

    console.log('🛑 Google Chrome stopped.');
  }

  isRunning() {
    return this.context !== null;
  }
}

module.exports = new ChromeManager();
