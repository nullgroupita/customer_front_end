<template>
    <div>
        <van-cell-group style='margin-bottom: 30px'>
            <van-field
                v-model='username'
                label='用户名'
                placeholder='请输入用户名'
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <van-button type='primary' style='width: 80%; margin-bottom: 30px;' @click='login()'>登录</van-button>
        <br />
        <router-link to="/register">没有账号？</router-link>
        
    </div>
</template>

<<script>
export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login () {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
        }
    },
}
</script>