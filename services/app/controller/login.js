'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async register() {
    const { ctx } = this;
    const { password, username, email, mobile } = ctx.request.body;
    await ctx.service.user.register({ password, username, email, mobile });
  }
}

module.exports = LoginController;
