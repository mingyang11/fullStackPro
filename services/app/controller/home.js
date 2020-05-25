'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // f
    ctx.body = ctx.user;
  }
}

module.exports = HomeController;
