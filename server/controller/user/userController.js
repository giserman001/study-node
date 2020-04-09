const userModule = require('../../modules/userModule')

module.exports = {
  getUserList: async (ctx, next) => {
    const param = ctx.request.query
    const userList = await userModule.userList(param)
    if (userList.length) {
      let re = ctx.body = {
        state: 1,
        body: '成功',
        data: userList
      }
      return re
    }
  }
}
