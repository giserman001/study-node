const Router = require('koa-router')

const apiController = require('../../controller/api/apiController.js')

const authority = require('./authority.js')
const user = require('./user')

const router = new Router({
  prefix: '/api'
})

router.all('/', apiController.index)
  .use(authority.routes())
  .use(user.routes())
module.exports = router
