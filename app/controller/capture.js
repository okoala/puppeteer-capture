'use strict';

const Controller = require('egg').Controller;

class CaptureController extends Controller {
  async index() {
    this.ctx.body = 'hi, puppeteer';
  }

  async fullpage() {
    const { ctx, app } = this;
    const page = await app.browser.newPage();
    await page.goto(decodeURIComponent(ctx.request.body.path));
    ctx.body = await page.screenshot({ fullPage: true });
    ctx.type = 'image/png';

    page.close();
  }

  async dom() {
    const { ctx, app } = this;
    const padding = ctx.request.body.padding || 0;
    const path = ctx.request.body.path;
    const html = ctx.request.body.html;
    const selector = ctx.request.body.selector;
    const omitBackground = ctx.request.body.omitBackground || false;

    const page = await app.browser.newPage();

    if (!selector) throw Error('Please provide a selector.');
    if (!path && !html) throw Error('Please provide a path or html.');

    await page.goto(decodeURIComponent(path), {
      waitUntil: 'networkidle2',
    });

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const { x, y, width, height } = element.getBoundingClientRect();
      return { left: x, top: y, width, height, id: element.id };
    }, selector);

    if (!rect)
      throw Error(
        `Could not find element that matches selector: ${selector}`
      );

    ctx.body = await page.screenshot({
      clip: {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      },
      omitBackground
    });

    ctx.type = 'image/png';

    page.close();
  }
}

module.exports = CaptureController;
