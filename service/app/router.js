'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 根据版本接口来开发
  const apiV2Router = app.router.namespace('/api/v2')

  router.get('/', controller.home.index);
  router.get('/news', controller.home.newsList);
  apiV2Router.post('/login/register', controller.login.register);
  apiV2Router.post('/login', controller.login.login)
};
