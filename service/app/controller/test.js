'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    const { ctx } = this;
    const data = [{
        name: '雪落',
        age: 12,
    }, {
        name: '冬临',
        age: 13,
    }]
    ctx.body = data;
  }
}

module.exports = TestController;
