<template>
  <div class="login-content">
    <div class="logo">
      <img src="../../../static/image/login/logo_02.png" alt="">
    </div>
    <div class="login-right">
      <div class="input-group">
        <h1>用户登录</h1>
        <p>
          <Input v-model="info.username" icon="person" autofocus placeholder="请输入账号"></Input>
          <span class="nameiconList"></span>
        </p>
        <p>
          <Input class="passwordList" icon="locked" v-model="info.password" @on-enter="submit" type="password" placeholder="请输入密码"></Input>
        </p>
        <p class="submitbutton">
          <Button type="success" @click="submit" :loading="showLoading">
            <span class="buttongdl" v-if="!showLoading">登&nbsp;&nbsp;&nbsp;录</span>
            <span v-else>登录中...</span>
          </Button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { goLogin } from 'api/login'
import { ERR_OK } from 'api/config'
import { warningNotice, successNotice } from 'common/js/dom'
import { setUserIng } from 'common/js/util'
export default {
  data () {
    return {
      info: {
        username: '',
        password: ''
      },
      showLoading: false
    }
  },
  methods: {
    // 点击登录
    submit () {
      this.showLoading = true
      goLogin({'username': this.info.username, 'password': this.info.password }).then(res => {
        console.log(res)
        this.showLoading = false
        if (res.code === ERR_OK) {
          successNotice('登录成功')
          setUserIng(res.result)
          this.$router.push('/main/home')
        } else {
          warningNotice('用户名或密码错误')
          this.info.username = ''
          this.info.password = ''
        }
      })
    }
  },
  mounted() {

  },
}
</script>

<style lang="less" scoped>
.login-content {
  position: relative;
  height: 100%;
  background: url('../../../static/image/login/gaoming.jpg');
  background-size: cover;
  .logo {
    width: 23vw;
    padding-bottom: 2vh;
    text-align: center;
    img {
      width: 100%;
      max-width: 525px;
    }
  }
  .login-right {
    position: absolute;
    width: 30vw;
    right: 0vw;
    top: 35vh;
    .input-group {
      width: 400px;
      height: 380px;
      border: 1px solid white;
      margin: 0 2vw;
      padding: 3vh 0;
      text-align: center;
      background: #fff;
      border-radius: 15px;
      h1 {
        padding-bottom: 20px;
        color: #00a4e1;
        font-size: 30px;
      }
      p {
        padding-bottom: 30px;
        .ivu-input-wrapper {
          width: 88%;
          height: 60px;
          .ivu-input {
            width: 137%;
            height: 100%;
            padding: 20px 7px;
            margin-left: -45px;
          }
          .ivu-icon {
            //height: 100%;
            line-height: 30px;
            font-size: 23px;
            margin-top: 6px;
          }
        }
        .ivu-btn {
          width: 89%;
          margin-left: 2px;
          font-size: 30px;
          border-radius: 8px;
          color: #fff;
          background: #00a4e1;
        }
      }
    }
  }
}
</style>

