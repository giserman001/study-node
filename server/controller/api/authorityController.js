const authorityModule = require('../../modules/authorityModule')
const {getToken} = require('../../middlewares/token')

module.exports = {
  register: async (ctx, next) => {
    console.log(ctx.request.body, 'ctx.request.body')
    const {username, password, email} = ctx.request.body
    if (!username) {
      return ctx.body = {
        state: 0,
        body: '请输入用户名'
      }
    }
    if (!password) {
      return ctx.body = {
        state: 0,
        body: '请输入密码'
      }
    }
    if (!email) {
      return ctx.body = {
        state: 0,
        body: '请输入邮箱'
      }
    }
    let res = await authorityModule.register(username, password, email)
    if (res instanceof Object) {
      return ctx.body = {
        state: 1,
        body: '注册成功'
      }
    } else {
      return ctx.body = {
        state: 0,
        body: '注册失败'
      }
    }
  },
  login: async (ctx, next) => {
    const {username, password} = ctx.request.body
    let userInfo = await authorityModule.login(username, password)
    if (userInfo === false) {
      return ctx.body = {
        state: 0,
        body: '用户名或密码错误'
      }
    }
    const token = getToken(userInfo)
    return ctx.body = {
      state: 1,
      token: token
    }
  },
  logout: async (ctx, next) => {
  }
}
