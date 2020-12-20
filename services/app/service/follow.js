'use strict';
const Service = require('egg').Service;

class FollowService extends Service {
  async followUser(followUser) {
    return await this.ctx.model.Follow.create(followUser);
  }
}

module.exports = FollowService;
