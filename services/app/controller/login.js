'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async register() {
    const { ctx } = this;
    const { password, username, email, mobile } = ctx.request.body;
    await ctx.service.user.register({ password, username, email, mobile });
  }

  async loginIn() {
    const { ctx } = this;
    const { password, email } = ctx.request.body;

    const token = await ctx.service.user.loginIn({ password, email });
    if (token) {
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24,
        // httpOnly: false,
        // domain: '127.0.0.1',
      };

      ctx.cookies.set(this.config.auth_cookie_name, token, opts);

      ctx.status = 200;
      ctx.body = {
        Content: '登陆成功',
        ErrorCode: 200,
        ErrorMessage: '',
        Success: true,
      };
      return;
    } else {
      ctx.status = 400;
      ctx.body = {
        Content: '',
        ErrorCode: 400,
        ErrorMessage: '账号密码错误',
        Success: false,
      };
    }
  }

  async signOut() {
    const { ctx } = this;
    ctx.cookies.set(this.config.auth_cookie_name, '');
    ctx.status = 200;
    ctx.body = {
      Content: '登陆成功',
      ErrorCode: 200,
      ErrorMessage: '',
      Success: true,
    };
  }
}

module.exports = LoginController;
