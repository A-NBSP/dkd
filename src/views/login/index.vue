<template>
  <div class="login-container">
    <el-form ref="loginForm" :rules="rules" :model="loginForm" class="login-form" auto-complete="on" label-position="left" @submit.native.prevent>
      <img class="login-logo" src="@/assets/common/logo.png" alt="">

      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="请输入账号"
          name="loginName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          :type="passwordType"
        />
        <span class="show-pwd" @click="showpwd">
          <svg-icon :icon-class="passwordType === 'password'? 'eye':'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="code">
        <span class="svg-container">
          <svg-icon icon-class="link" />
        </span>
        <el-input
          v-model="loginForm.code"
          class="yzm"
          placeholder="请输入验证码"
          name="code"
          tabindex="2"
          type="text"
        >
          <template #suffix>
            <el-image :src="photoSrc" @click="getphoto" />
          </template>
        </el-input>
      </el-form-item>
      <el-button type="text" class="login-btn" @click="onlogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { photo } from '@/api'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')
export default {
  name: 'Login',
  data() {
    return {
      photoSrc: '',
      passwordType: 'password',
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0
      },
      rules: {
        loginName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度必须在6~16位' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapState(['userMsg'])
  },
  created() {
    this.getphoto()
  },
  methods: {
    async getphoto() {
      const random = Math.random()
      this.loginForm.clientToken = random
      // 1.将读取到的转blob数据
      const { data } = await photo(random)
      const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
      this.photoSrc = window.URL.createObjectURL(blob)
    },
    showpwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async onlogin() {
      await this.$store.dispatch('user/asyncToken', this.loginForm)
      if (this.userMsg.success) {
        this.$router.push('/')
      } else {
        this.$message({
          message: this.userMsg.msg,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.login-logo{
  position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
}
.login-btn{
   width: 100%;
    height: 52px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf;
    margin-bottom:30px
}
/* reset element-ui css */
.login-container {
  background:url('~@/assets/common/background.png') no-repeat;
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 90%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 6px 12px 15px;
      color: #9999a6;
      height: 47px;
      caret-color: $bg;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $cursor inset !important;
        -webkit-text-fill-color: #9999a6 !important;
      }
    }
  }
  .el-form-item {
    width: 100%;
    height: 52px;
    margin-bottom: 24px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .yzm{
    width: 416px;
  }
}
</style>
