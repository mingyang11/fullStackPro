/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// eslint-disable-next-line arrow-parens
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

  // 白名单
  config.authWhiteList = [ '/', '/api/v2/login', '/api/v2/register' ];
  // 中间件，每次请求的时候都会经过
  config.middleware = [ 'authorization' ];

  return {
    ...config,
    ...userConfig,
  };
};
