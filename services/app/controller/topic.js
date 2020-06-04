'use strict';

const Controller = require('egg').Controller;

class TopicController extends Controller {
  async addTopic() {
    const { ctx } = this;
    const { topicimg, topictitle } = ctx.request.body;
    let userid = ctx.user.userid;
    let newTopic = {
      topicimg: JSON.stringify(topicimg),
      topictitle,
      userid,
    };
    await ctx.service.topic.insertTopic(newTopic);
    ctx.status = 200;
    ctx.body = {
      Content: '发帖成功',
      ErrorCode: 200,
      ErrorMessage: '',
      Success: true,
    };
  }
}

module.exports = TopicController;
