'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.home.newsList);
  router.get('/dev/test', controller.test.index);
  router.post('/login/register', controller.login.register)
};
