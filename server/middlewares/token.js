const jwt = require('jsonwebtoken')
const config = require('../config/index.js').token

module.exports = {
  // 获取token
  getToken: (obj) => {
    return jwt.sign({...obj}, config.key, config.options)
  },
  // 验证token
  verifyToken: async (ctx, next) => {
    // 设置白名单（login/register两个接口不做token验证）
    if (ctx.request.url.indexOf('/login') !== -1) {
      await next()
      return
    }
    if (ctx.request.url.indexOf('/register') !== -1) {
      await next()
      return
    }
    try {
      const token = ctx.headers.token
      if (token) {
        const res = jwt.verify(token, config.key)
        console.log(res, 'wuxiao')
        if (res) {
          await next()
        } else {
          ctx.body = {state: 0, text: 'token无效'}
        }
      } else {
        ctx.body = {state: 0, text: '无token'}
      }
    } catch (error) {
      ctx.body = {state: 0, text: '无token'}
    }
  }
}

