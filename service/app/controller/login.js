'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    const { username, email, password } = ctx.request.body;
    // eslint-disable-next-line no-unused-vars
    const userInfo = await ctx.service.user.register({
      username,
      email,
      password,
    });
  }

  // 登陆
  async login() {
    const { ctx, app } = this;
    const { email, password } = ctx.request.body;
    const token = await ctx.service.user.login({ email, password });
    if (token) {
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // httpOnly: false,
        // domain: '127.0.0.1',
      };
      ctx.cookies.set(app.config.auth_cookie_name, token, opts);
      ctx.status = 200;
      ctx.body = {
        Content: {
          msg: '登陆成功',
        },
        ErrorCode: 200,
        ErrorMessage: '',
        Success: true,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        Content: {},
        ErrorCode: 200,
        ErrorMessage: '登陆失败',
        Success: false,
      };
    }
  }
}

module.exports = LoginController;
