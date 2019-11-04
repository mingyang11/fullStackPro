'use strict';

const Controller = require('egg').Controller;

class budgetController extends Controller {
  async addBudget() {
    const { ctx } = this;
    const { budgetitle, budgetcontent, money, receiver } = ctx.request.body;
    const { userid } = ctx.user;
    const budgetInfo = await this.service.budget.addBudget({
      userid,
      budgetitle,
      budgetcontent,
      money,
      receiver,
    });
    ctx.returnBody(200, '获取成功', budgetInfo);
  }
  // 查询所有用户信息
  //   async findUserList() {
  //     const { ctx } = this;
  //     const users = await ctx.service.user.findUserList();
  //     ctx.status = 200;
  //     ctx.body = {
  //       Content: users,
  //       ErrorCode: 200,
  //       ErrorMessage: '',
  //       Success: true,
  //     };
  //   }
}

module.exports = budgetController;
