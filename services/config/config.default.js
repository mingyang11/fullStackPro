/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.security = { csrf: { enable: false } };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588771908386_5671';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 加密字符串
  config.password_secret = 'yangming';
  config.jwtSecret = 'ming';
  config.auth_cookie_name = 'token';

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'learn',
    password: 'yangming1992',
  };

  return {
    ...config,
    ...userConfig,
  };
};
