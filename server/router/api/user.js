const Router = require('koa-router')

const userController = require('../../controller/user/userController')

const router = new Router({
  prefix: '/user'
})
/**
 * @api {get} /api/user/userList 获取用户列表
 * @apiDescription 获取用户列表
 * @apiName  userList
 * @apiGroup user
 * @apiParam {string} username 用户名
 * @apiParam {string} beginTime 开始时间
 * @apiParam {string} endTime 结束时间
 * @apiParam {number} pageSize
 * @apiParam {number} pageNum
 * @apiParam {number} type 用户类型
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "state" : 1,
 *      "body" : token
 *  }
 * @apiSampleRequest http://localhost:8083/api/authority/login
 * @apiVersion 1.0.0
 */
router
  .get('/userList', userController.getUserList)

module.exports = router
