'use strict';

const puppeteer = require('puppeteer');

module.exports = app => {
  app.beforeStart(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

    app.browser = browser;
  })
}