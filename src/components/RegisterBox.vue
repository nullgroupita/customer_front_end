<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="userName"
                required
                clearable
                label="用户名"
                placeholder="请输入用户名"
                required
            />

            <van-field
                v-model="telephone"
                required
                clearable
                label="手机号"
                placeholder="请输入手机号"
                required
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />

            <van-field
                v-model="confirmPassword"
                type="password"
                label="密码确认"
                placeholder="请再次输入密码"
                required
            />

             <van-button type='primary' style='width: 80%; margin-top: 30px;' @click='register()'>注册</van-button>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userName: '',
            telephone: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        register () {
            if (this.password == this.confirmPassword) {
                this.$store.dispatch('register', {
                    userName: this.userName,
                    telephone: this.telephone,
                    password: this.password
                })
            }
        }
    },
}
</script>