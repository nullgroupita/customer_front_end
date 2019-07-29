import axios from './config'
import cookies from 'vue-cookies'
import router from '../router'
import { Notify } from 'vant';
import Vue from 'vue'

Vue.use(Notify)

const login = params => {
    axios.post('/login', params)
        .then (res => {
            console.log(res)
            if (res.retCode == 200) {
                cookies.set('token', res.data.data)
                router.push('/home')
            } else {
                Notify("用户名或密码错误")
            }
        })
        .catch (err => {
            console.log(err)
        })
}

const register = params => {
    console.log(params)
    axios.post('/register', params)
        .then (res => {
            console.log(res)
            if (res.retCode == 200) {
                cookies.set('token', res.data.data)
                router.push('/home')
            } else {
                Notify("未知错误")
            }
        })
        .catch (err => {
            console.log(err)
        })
}

export default {
    login,
    register
}