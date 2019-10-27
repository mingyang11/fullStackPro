'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 根据版本接口来开发
  const apiV2Router = router.namespace('/api/v2');
  apiV2Router.post('/register', controller.login.register);
  apiV2Router.post('/login', controller.login.login);
  apiV2Router.get('/signout', controller.login.signout);
  apiV2Router.get('/user/info', controller.users.userInfo);
  apiV2Router.get('/user/list', controller.users.findUserList);
};
