const Service = require('egg').Service;
const uuid = require('uuid');

class UserService extends Service {
  async register(user) {
    const { v4 } = uuid;
    const { ctx } = this;
    user.userid = v4().replace(/-/g, '');
    const queryResult = await this.hasRegister(user.email);
    if (queryResult) {
      ctx.status = 200;
      ctx.body = {
        Content: '',
        ErrorCode: 200,
        ErrorMessage: '该邮箱已注册',
        Success: false,
      };
      return;
    }

    const userInfo = await ctx.model.User.create(user);
    ctx.status = 200;
    ctx.body = {
      Content: {
        userid: user.userid,
      },
      ErrorCode: 200,
      ErrorMessage: '',
      Success: true,
    };
    console.log(userInfo, 'userIndo');
    return userInfo;
  }

  async hasRegister(email) {
    const user = await this.ctx.model.User.findOne({
      where: { email: email },
    });
    if (user && user.dataValues.userid) {
      return true;
    }
    return false;
  }
}

module.exports = UserService;
