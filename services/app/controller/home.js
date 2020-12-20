'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // f
    ctx.body = {
      name: '杨明',
      age: 28,
    };
  }
}

module.exports = HomeController;
