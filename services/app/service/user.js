'use strict';
const Service = require('egg').Service;
const uuid = require('uuid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class UserService extends Service {
  // 注册
  async register(user) {
    const { v4 } = uuid;
    const { ctx, app } = this;
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

    /**
     * 使用node自带的加密算法， ‘sha256是加密格式’
     * app.config.password_secret是开发这存储的加密字符串
     */
    user.password = crypto
      .createHmac('sha256', app.config.password_secret)
      .update(user.password)
      .digest('hex');

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
      where: { email },
    });
    if (user && user.dataValues.userid) {
      return true;
    }
    return false;
  }

  // 登陆
  async loginIn(user) {
    const { app } = this;
    const { email, password } = user;
    const existUser = await this.getUserByEmail(email);

    if (!existUser) {
      return null;
    }

    const parrHash = existUser.password;
    const equal =
      parrHash ===
      crypto
        .createHmac('sha256', app.config.password_secret)
        .update(password)
        .digest('hex');
    if (!equal) {
      return false;
    }
    const token = jwt.sign({ userid: existUser.userid }, app.config.jwtSecret, {
      expiresIn: '7d',
    });
    return token;
  }

  async getUserByEmail(email) {
    const user = await this.ctx.model.User.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

module.exports = UserService;
