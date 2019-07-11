'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async newsList() {
    const { ctx } = this;
    const newsData = {name: 'yangming', age: 12}
    ctx.body = newsData;
  }
}

module.exports = HomeController;
