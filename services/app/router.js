'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  // 路由版本
  const apiV2Router = router.namespace('/api/v2');
  router.get('/', controller.home.index);
  apiV2Router.post('/register', controller.login.register);
  apiV2Router.post('/login', controller.login.loginIn);
};
