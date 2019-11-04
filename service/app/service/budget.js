'use strict';

const { Service } = require('egg');

class UserService extends Service {
  async addBudget(params) {
    const budgetInfo = await this.ctx.model.Budget.create(params);
    console.log(budgetInfo, 'budgetInfo');
    return budgetInfo;
  }
}

module.exports = UserService;
