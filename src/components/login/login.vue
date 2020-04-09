<template>
  <div class="login_container">
    <div class="login_form">
      <div class="login_form_content">
        <p class="login_form_title">金棕榈数据管理平台</p>
        <el-form ref="form" :model="form" label-width="0px">
          <el-form-item>
            <p>用户名</p>
            <el-input v-model="form.userAccount" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <p>密码</p>
            <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="submit" class="fullBtn">登录</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {}
      }
    },
    methods: {
      submit () {
        this.$router.push('/dataCleanout')
      }
    },
    async mounted () {
    }
  }
</script>

<style>
  .login_container .el-form-item {
    margin: 0;
  }

  .login_container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #fff;
    position: relative;
  }

  .login_form {
    width: 1080px;
    height: 620px;
    overflow: hidden;
    box-sizing: border-box;
    background: url("../../images/login-bg.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 40px;
  }

  .login_form_content {
    width: 557px;
    height: 560px;
    float: right;
    padding: 0 86px 0 97px;
    box-sizing: border-box;
  }

  .login_form_title {
    font-size: 28px;
    color: rgba(1, 1, 1, 1);
    font-weight: 400;
    margin-top: 57px;
  }

  .login_container .el-form {
    margin-top: 28px;
  }

  .login_container .el-form p {
    color: #878787;
    font-size: 16px;
    font-weight: 400;
    margin-top: 16px;
    margin-bottom: 13px;
  }

  .login_container .el-form input {
    border: 0;
    border-bottom: 1px solid #999999;
    border-radius: 0;
    font-size: 16px;
    color: #090909;
    padding: 0;
  }

  .login_container .el-form input:focus, .login_container .el-form input:hover {
    border-bottom: 1px solid #2977FB;
  }

  .fullBtn {
    background: #125FE2;
    border-radius: 0;
    line-height: 49px;
    color: #fff;
    padding: 0;
    margin: 0;
    margin-top: 69px;
    border-radius: 4px;
  }

  .fullBtn span {
    font-size: 20px !important;
    font-weight: 600;
  }

  .login_container .el-button--primary:focus, .login_container .el-button--primary:hover {
    background: #125FE2;
    border-color: #125FE2;
  }
</style>
