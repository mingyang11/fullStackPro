const Service = require('egg').Service;
const uuid = require('uuid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class UserService extends Service {
    async login(user) {
        const { app } = this;
        const existUser = await this.getUserByMail(user.email);
        if(!existUser) {
            return null;
        }

        const passHash = existUser.password;
        const equal = passHash === crypto.createHmac('sha256', app.config.password_secret)
        .update(user.password).digest('hex');
        if(!equal) {
            return false;
        }

        const token = jwt.sign({userid: existUser.userid}, app.config.jwtSecret, {expiresIn: '7d'});
        return token;
    }

    async getUserByMail(email) {
        return this.ctx.model.User.findOne({
            where: {
                email: email,
            }
        });
    }

    async register(user) {
        const { ctx, app } = this;
        user.userid = uuid.v4().replace(/-/g, '');
        const queryResult = await this.hasRegister(user.email);
        if(queryResult) {
            ctx.status = 200;
            ctx.body = {
                msg: '该邮箱已注册账户',
                succ: false,
            }
            return;
        }

        user.password = crypto.createHmac('sha256', app.config.password_secret)
            .update(user.password).digest('hex');

        const userInfo = await ctx.model.User.create(user);
        ctx.status = 200;
        ctx.body = {
            msg: '注册成功',
            userid: user.userid,
            flag: true,
        }
        return userInfo.dataValues;
    }

    async hasRegister(email) {
        const user = await this.ctx.model.User.findOne({
          where: { email: email }
        });
        if (user && user.dataValues.userid) {
          return true;
        }
        return false;
    }
}

module.exports = UserService;