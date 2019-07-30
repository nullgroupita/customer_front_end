<template>
  <div>
    <van-cell-group style='margin-bottom: 30px'>
      <van-field v-model='username' label='用户名' placeholder='请输入用户名' />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required
        :error-message="passwordErrorMessage" @focus="passwordErrorMessage = ''" />
    </van-cell-group>
    <van-button type='primary' style='width: 80%; margin-bottom: 30px;' @click='login()'>登录</van-button>
    <br />
    <router-link to="/register">没有账号？</router-link>

  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  data () {
    return {
      username: '',
      password: '',
      passwordErrorMessage: ''
    }
  },
  methods: {
    login () {
      if (this.password.length !== 0) {
        this.$store.dispatch('login', {
          userName: this.username,
          password: md5(this.password)
        })
      } else {
        this.passwordErrorMessage = '请输入密码'
      }
    }
  }
}
</script>
