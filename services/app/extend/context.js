const jwt = require('jsonwebtoken');

module.exports = {
  get jwt() {
    return jwt;
  },

  // 获取用户信息
  get user() {
    let token = this.cookies.get('token');
    let user = jwt.verify(token, this.app.config.jwtSecret);
    return user;
  },
};
