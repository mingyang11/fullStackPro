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
  const config = exports = {
    security: {
      csrf : {
        headerName: 'x-csrf-token',// 自定义请求头
      }
    }
  };
  // config.security= {
  //   csrf : {
  //     headerName: 'x-csrf-token',// 自定义请求头
  //   }
  // }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1560783102568_1643';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

