'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    const { username, email, password } = ctx.request.body;
    const userInfo = await ctx.service.user.register({
      username,
      email,
      password,
    });
    console.log(userInfo);
  }

  // 登陆
  async login() {
    const { ctx } = this;
    const { email, password } = ctx.request.body;
    const token = await ctx.service.user.login({ email, password });
    if (token) {
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // httpOnly: false,
        // domain: '127.0.0.1',
      };
      ctx.cookies.set(this.app.config.auth_cookie_name, token, opts);
      ctx.status = 200;
      ctx.body = {
        message: '登陆成功',
        Succ: true,
      };
    } else {
      ctx.status = 400;
      ctx.body = { msg: '用户名或密码错误', Succ: false };
    }
  }
}

module.exports = LoginController;
