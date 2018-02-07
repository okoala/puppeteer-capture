'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517972139912_794';

  // config.security = {
  //   enable: false
  // }

  exports.cluster = {
    listen: {
      port: 15346,
      hostname: '0.0.0.0',
    }
  }

  // add your config here
  config.middleware = [];

  return config;
};
