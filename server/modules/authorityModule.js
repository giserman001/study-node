const mysql = require('../config/database/mysql')

module.exports = {
  login: async (username, password) => {
    let sql = `SELECT * FROM user WHERE username='${username}' AND password='${password}'`
    let result = await mysql.db(sql)
    if (result === false || result.length <= 0) {
      return false
    }
    console.log(result)
    delete result[0].password
    return result[0]
  },
  register: async (username, password, email) => {
    let sql = `INSERT INTO user(username, password, email) VALUES(${username},${password},${email})`
    let result = await mysql.db(sql)
    return result
  }
}
