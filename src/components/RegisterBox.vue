<template>
  <div>
    <van-cell-group>
      <van-field v-model='userName' required clearable label='用户名' placeholder='请输入用户名'/>

      <van-field v-model='telephone' type="number" :error-message='phoneErrorMessage' clearable label='手机号'
        placeholder='请输入手机号' required @focus="phoneErrorMessage = ''" />

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />

      <van-field v-model="confirmPassword" type="password" label="密码确认" placeholder="请再次输入密码" required
        :error-message="passwordErrorMessage" @focus="passwordErrorMessage = ''" />

      <van-button type='primary' style='width: 80%; margin-top: 30px;' @click='register()'>注册</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  data () {
    return {
      userName: '',
      telephone: '',
      password: '',
      confirmPassword: '',
      phoneErrorMessage: '',
      passwordErrorMessage: ''
    }
  },
  methods: {
    register () {
      const u = this.userName.length === 0
      const t = this.telephone.length === 0
      const p = this.password.length === 0
      const c = this.confirmPassword.length === 0
      if (u || t || p || c) {
        this.$notify('请输入所有必填项')
        return
      }

      const same = this.password === this.confirmPassword
      const len = this.telephone.length === 11
      if (same && len) {
        this.$store.dispatch('register', {
          userName: this.userName,
          telephone: this.telephone,
          password: md5(this.password)
        })
      } else if (!same) {
        this.passwordErrorMessage = '两次密码不一致'
      } else {
        this.phoneErrorMessage = '手机号码为11位'
      }
    }
  }
}

</script>
