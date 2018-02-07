'use strict';

const puppeteer = require('puppeteer');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.capture.index);
  router.post('/getFullPage', controller.capture.fullpage);
  router.post('/getDom', controller.capture.dom);
};
