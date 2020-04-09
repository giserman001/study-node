<template>
  <div>
    <el-container class="home_container">
      <el-header class="header">
        <el-col :span="6" style="line-height: 60px;font-size: 24px;color: #2977FB;font-weight:500;padding-left: 30px;box-sizing: border-box;">
          {{sysName}}
        </el-col>
        <el-col :span="14">
          <!--导航菜单-->
          <el-menu :default-active="$route.meta.head" mode="horizontal" @select="handleselectTop" background-color="transparent" active-text-color="#1890ff" text-color="#909399" style="height: 100%;">
            <template v-for="(item,index) in topMenu">
              <el-menu-item :index="item.name">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-col>
        <el-col :span="4" class="userinfo">
          <el-dropdown trigger="hover" @command="dropdownRouterPush">
            <span class="el-dropdown-link userinfo-inner">{{userName || '您好'}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="" @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-header>
      <el-container class="main">
        <el-aside class="aside" style="width: auto;" :class="[collapsed ? 'overVis' : '']">
          <!-- <span class="pickUp" @click="collapse"><img src="../../images/pickUp.png" /></span> -->
          <!--导航菜单-->
          <el-menu :default-active="$route.meta.menuActive || $route.path" background-color="#0D2348" :collapse="collapsed" text-color="rgba(255,255,255,0.5)" unique-opened router style="height: 100%;width: 200px;">
            <template v-for="(item,index) in currrentLeftMenu">
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title">
                  <!-- <i :class="item.iconCls"></i> -->
                  <span slot="title">{{item.name}}</span>
                </template>
                <template v-for="(child, index2) in item.childMenu">
                  <el-menu-item v-if="child.leaf"  :index="child.path" :key="child.path">
                    <span slot="title">{{child.name}}</span>
                  </el-menu-item>
                  <el-submenu v-if="!child.leaf" :index="'child' + index2">
                    <template slot="title">{{child.name}}</template>
                    <el-menu-item v-for="child2 in child.children" :index="child2.path" :key="child2.path" v-if="!child2.leaf">
                      <span slot="title">{{child2.name}}</span>
                    </el-menu-item>
                  </el-submenu>
                </template>
                <template v-for="(child, index2) in item.children">
                  <el-menu-item v-if="!child.leaf"  :index="child.path" :key="child.path">
                    <span slot="title">{{child.name}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item v-if="item.leaf && item.children.length>0" :index="item.children[0].path" :key="item.children[0].path">
                <!-- <i :class="item.iconCls"></i> -->
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="content-container" style="background-color: #F0F2F5;">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="el-fade-in" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import storage from '../../plugins/storage'
  export default {
    data () {
      return {
        sysName: '后台管理系统',
        leftMenu: [], // 当前左边菜单
        collapsed: false,
        userName: '',
        modules: storage.get('CMS_Modules'),
        topMenu: [],
        currrentLeftMenu: []
      }
    },
    computed: {},
    async mounted () {
      let leftMenu = this.$router.options.routes.filter((item) => {
        return !item.isTop && !item.isHide
      })
      this.topMenu = this.$router.options.routes.filter((item) => {
        if (item.isTop) {
          let list = leftMenu.filter((left) => {
            return left.parentName === item.name
          })
          if (list && list.length) {
            this.leftMenu = this.leftMenu.concat(list)
          }
        }
        return item.isTop
      })
      this.leftMenu.forEach((item) => {
        this.createLeftMenu(item, leftMenu, this)
      })
      this.currrentLeftMenu = this.leftMenu.filter((item) => {
        return this.$route.meta.head === item.parentName
      })
    },
    methods: {
      dropdownRouterPush (routeName) {
        if (routeName) {
          this.$router.push(routeName)
        }
      },
      collapse () {
        console.log('ss')
        this.collapsed = !this.collapsed
      },
      logout () {
      },
      createLeftMenu: (obj, menus, vm) => {
        if (!obj.children || !obj.children.length) {
          let list = menus.filter((item) => {
            return obj.name === item.parentName
          })
          obj.childMenu = list
          list.forEach((item) => {
            vm.createLeftMenu(item, menus)
          })
        }
      },
      handleselectTop (key) {
        this.currrentLeftMenu = this.leftMenu.filter((item) => {
          return key === item.parentName
        })
        this.currrentMenu(this.currrentLeftMenu, this)
      },
      currrentMenu (list, vm, isPush) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (item.children && item.children.length) {
            let tempList = item.children.filter((item) => {
              return !item.leaf
            })
            if (tempList && tempList.length) {
              vm.$router.push(tempList[0].path)
              break
            }
          } else {
            vm.currrentMenu(item.childMenu, vm)
            break
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../style/theme.styl"

  .home_container
    height 100vh
    display: flex
    flex-direction column
    .header
      line-height: 60px;
      color: #fff;
      background: color-primary;
      padding: 0
      .userinfo
        text-align: right;
        padding-right: 35px;
        float: right;
        position relative
        :before
          content ''
          position absolute
          top 50%
          transform translateY(-50%)
          left -40px
          background url(../../images/nav_icon_user.png) no-repeat
          background-size cover
          width 30px
          height 30px
        .userinfo-inner
          cursor: pointer;
          color: #333;
          img
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
      .logo
        width: 250px;
        height: 60px;
        font-size: 18px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
        background-color: color_header_top_left
        img
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        .txt
          color: #fff
      .logo-width
        width: 230px
      .logo-collapse-width
        width: 60px
      .tools
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        &.pl0
          padding-left: 0

    .main
      overflow: hidden;
      .aside
        overflow auto
        position:relative;
        .pickUp
          position:absolute;
          right:0;
          bottom:50px;
          z-index:100;
          cursor:pointer;
        &.overVis
          overflow visible
        .el-menu-item, .el-submenu__title
          &:focus
            background-color: #1890ff!important
            color: #fff
          &:hover
            /*background-color: #1890ff!important*/
            color: #fff
          &.is-active
            color: #fff
            background-color: #1890ff!important
        .el-submenu
          .el-menu-item
            &:focus
              background-color: #1890ff!important
              color: #fff!important
            &:hover
              /*background-color: #1890ff!important*/
              color: #fff!important
            &.is-active
              color: #fff
              background-color: #1890ff!important
        .el-menu:not(.el-menu--collapse) {
          width: 250px;
        }
      .breadcrumb-container
        overflow: hidden
        .title
          float: left
          font-size: 14px
        .breadcrumb-inner
          float: right
      .content-container
        background-color: #fff
  .headerTopCenter
    color: #000
    &.ml64
      padding-left: 20px
  .hideRest
    background-color: color_header_top_left
    width: 64px
    height: 60px

  .home_container .main .aside .el-menu:not(.el-menu--collapse)
    width: 200px

  .home_container .is-active>.el-submenu__title
    color: #fff !important
</style>
