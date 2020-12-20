'use strict';
const jwt = require('jsonwebtoken');

module.exports = {
  get jwt() {
    return jwt;
  },

  // 获取用户信息
  get user() {
    const token = this.cookies.get('token');
    const user = jwt.verify(token, this.app.config.jwtSecret);
    return user;
  },
};
