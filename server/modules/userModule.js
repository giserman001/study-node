const mysql = require('../config/database/mysql')

module.exports = {
  userList: async (query) => {
    let mid = ''
    let {username, beginTime, endTime, pageSize = 10, pageNum = 1, type} = query
    if (username) {
      mid += `AND username LIKE '%${username}%'`
    }
    if (beginTime && endTime) {
      mid += `AND createdAt BETWEEN ${beginTime} AND ${endTime}`
    }
    // 0|'' 全部 1 github用户 2 站内用户
    if (type === 1) {
      mid += `AND github IS NOT NULL`
    } else if (type === 2) {
      mid += `AND github IS NULL`
    }
    let sql = `SELECT * FROM user WHERE 1=1 ${mid} LIMIT ${(pageNum - 1) * pageSize}, ${pageSize}`
    let res = await mysql.db(sql)
    return res
  }
}

