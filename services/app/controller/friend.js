('use strict');

const Controller = require('egg').Controller;

class FriendController extends Controller {
  async follow() {
    const { ctx } = this;

    const { userid, status } = ctx.request.body;
    let followedid = ctx.user.userid;
    let followMsg = {
      userid,
      status,
      followedid,
    };

    await ctx.service.follow.followUser(followMsg);
    ctx.body = {
      Content: status ? '关注成功' : '取消关注成功',
      ErrorCode: 200,
      ErrorMessage: '',
      Success: true,
    };
  }
}

module.exports = FriendController;
