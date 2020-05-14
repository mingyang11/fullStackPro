module.exports = (options, app) => {
  return async function (ctx, next) {
    if (app.config.authWhiteList.indexOf(ctx.url) !== -1) {
      await next(options);
      return;
    }

    if (ctx.cookies.get(app.config.auth_cookie_name)) {
      let token = ctx.cookies.get(app.config.auth_cookie_name);
      try {
        ctx.jwt.verify(token, app.config.jwtSecret);
      } catch (e) {
        ctx.status = 401;
        ctx.body = {
          Content: '',
          ErrorCode: 401,
          ErrorMessage: '你没有权限',
          Success: false,
        };
        return;
      }
      await next(options);
    } else {
      ctx.status = 401;
      ctx.body = {
        Content: '',
        ErrorCode: 401,
        ErrorMessage: '你没有权限',
        Success: false,
      };
      return;
    }
  };
};
