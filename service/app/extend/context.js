'use strict';

const jwt1 = require('jsonwebtoken');

module.exports = {
  get jwt() {
    return jwt1;
  },
  // 用户身份 jwt sign userId
  get user() {
    const token = this.cookies.get('token');
    const user = jwt1.verify(token, this.app.config.jwtSecret);
    return user;
  },
  returnBody(status, message, data = {}) {
    this.body = {
      Content: data,
      ErrorCode: status,
      ErrorMessage: message,
      Success: status === 200,
    };
  },
};
