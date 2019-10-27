'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async userInfo() {
    const { ctx } = this;
    // 可用于在postman测试时使用
    // const { userid } = ctx.request.body;
    const { userid } = ctx.user;
    const user = await this.service.user.getUserByUserId(userid);
    const userInfo = user;
    ctx.returnBody(200, '获取成功', userInfo);
  }
  // 查询所有用户信息
  async findUserList() {
    const { ctx } = this;
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

module.exports = UserController;
