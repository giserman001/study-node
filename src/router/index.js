import Vue from 'vue'
import Router from 'vue-router'

const header = r => require.ensure([], () => r(require('@/components/header/header.vue')), 'index')
// login
const login = r => require.ensure([], () => r(require('@/components/login/login.vue')), 'index')

// 首页
const home = r => require.ensure([], () => r(require('@/components/home/list.vue')), 'home')

// 文章
const articleList = r => require.ensure([], () => r(require('@/components/article/list.vue')), 'article')
const articleManger = r => require.ensure([], () => r(require('@/components/article/articleManger.vue')), 'article')

// 用户
const userManger = r => require.ensure([], () => r(require('@/components/userManger/userManger.vue')), 'userManger')
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  },
  routes: [
    {
      path: '/',
      name: 'redirect',
      redirect: '/login',
      isHide: true
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      isHide: true
    },
    // 头部菜单
    {
      path: '',
      name: '首页',
      iconCls: 'el-icon-s-platform',
      meta: {head: '首页'},
      isTop: true
    },
    {
      path: '',
      name: '用户',
      iconCls: 'el-icon-user-solid',
      meta: {head: '用户'},
      isTop: true
    },
    {
      path: '',
      name: '文章',
      iconCls: 'el-icon-s-tools',
      meta: {head: '文章'},
      isTop: true
    },
    // 左侧菜单
    {
      path: '',
      component: header,
      name: '首页管理',
      iconCls: 'el-icon-video-camera-solid',
      leaf: true,
      parentName: '首页',
      children: [
        {path: '/home', component: home, meta: {menuActive: '/home', head: '首页'}}
      ]
    },
    {
      path: '',
      component: header,
      name: '用户管理',
      parentName: '用户',
      leaf: true,
      iconCls: 'el-icon-s-release',
      children: [
        {path: '/userManger', component: userManger, meta: {menuActive: '/userManger', head: '用户'}}
      ]
    },
    {
      path: '',
      component: header,
      name: '文章列表',
      parentName: '文章',
      leaf: true,
      iconCls: 'el-icon-s-marketing',
      children: [
        {path: '/articleList', component: articleList, meta: {menuActive: '/articleList', head: '文章'}}
      ]
    },
    {
      path: '',
      component: header,
      name: '文章管理',
      parentName: '文章',
      leaf: true,
      iconCls: 'el-icon-s-finance',
      children: [
        {path: '/articleManger', component: articleManger, meta: {menuActive: '/articleManger', head: '文章'}}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
