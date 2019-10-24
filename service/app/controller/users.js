'use strict';

const Controller = require('egg').Controller;

class Select extends Controller {
  // 查询
  async findUserList() {
    const { ctx } = this;
    // const { email, password } = ctx.request.body;
    const users = await ctx.service.user.findUserList();
    ctx.status = 200;
    ctx.body = {
      Content: users,
      ErrorCode: 200,
      ErrorMessage: '',
      Success: true,
    };
  }
}

module.exports = Select;
