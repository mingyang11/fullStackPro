/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 取消post时crsf验证
  config.security= {
    csrf : {enable: false}
  }
  config.sequelize={
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: '123456',
    database: 'learn',
  }

  config.password_secret = 'yangming';
  config.jwtSecret = 'yangming';
  config.auth_cookie_name = 'token';
  config.authWhiteList = ['/', '/api/v2', '/api/v2/user/login', '/api/v2/user/login'];

  config.keys = appInfo.name + '_1560783102568_1643';

  config.middleware = ['authorization'];

  const userConfig = {};

  return {
    ...config,
    ...userConfig,
  };
};

