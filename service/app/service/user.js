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

            // 数据库插入值后会返回该值，用不用就是你自己的事情了
        const userInfo = await ctx.model.User.create(user);
        ctx.status = 200;
        ctx.body = {
            msg: '注册成功',
            userid: user.userid,
            flag: true,
        }
        // 将返回的值返回
        return userInfo.dataValues;
    }

    async hasRegister(email) {
        const user = await this.ctx.model.User.findOne({
          where: { email: email }
        });
        // 这里首先判断有没有搜索到user，如果有则会有defaultValues这个参数，双重判断是为了避免返回的user值会包含其它的数据
        if (user && user.dataValues.userid) {
          return true;
        }
        return false;
    }
}

module.exports = UserService;