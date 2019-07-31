import axios from './config'
import router from '../router'
import { Notify } from 'vant'
import Vue from 'vue'
import store from '../store'

Vue.use(Notify)

const login = params => {
  axios.post('/login', params)
    .then(res => {
      if (res.retCode === 200) {
        store.commit('saveToken', res.data)
        router.push('/home')
      } else {
        Notify('用户名或密码错误')
      }
    })
    .catch(err => {
      console.log(err)
    })
}

const register = params => {
  axios.post('/register', params)
    .then(res => {
      if (res.retCode === 200) {
        store.commit('saveToken', res.data)
        Notify({
          message: '注册成功',
          duration: 1000,
          background: '#1989fa'
        })
        router.push('/login')
      } else {
        Notify('未知错误')
      }
    })
    .catch(err => {
      console.log(err)
    })
}
// TODO
const getCustomerData = () => {
  axios.get('0')
    .then(res => {
      store.commit('saveId', res.data.id)
    })
    .catch(err => {
      console.log(err)
    })
}

// const createOrder = params => {
//   const url = store.state.customerId + '/orders'
//   axios.post(url, params)
//     .then(res => {
//       if (res.retCode === 200) {
//         Notify({
//           message: '下单成功',
//           duration: 1000,
//           background: '#1989fa'
//         })
//         router.push('/list-order')
//       } else {
//         Notify('您有未完成的订单，无法下单')
//       }
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

const createOrder = async params => {
  try {
    const url = store.state.customerId + '/orders'
    const res = await axios.post(url, params)
    return new Promise((resolve) => {
      resolve(res)
    })
  } catch (err) {
    console.log(err)
  }
}

const getPrice = async params => {
  try {
    const url = '/orders/price?parkingTime=' + params.parkingTime + '&fetchingTime=' + params.fetchingTime
    const res = await axios.get(url)
    return new Promise((resolve) => {
      resolve(res)
    })
  } catch (err) {
    console.log(err)
  }
}

const getOrdersByStatus = async params => {
  try {
    const url = store.state.customerId + '/orders?isFinish=' + params
    const res = await axios.get(url)
    return new Promise((resolve) => {
      resolve(res)
    })
  } catch (err) {
    console.log(err)
  }
}

const finishOrder = async params => {
  try {
    const url = store.state.customerId + '/orders/' + store.state.currentOrder.id
    const res = await axios.patch(url, params)
    return new Promise((resolve) => {
      resolve(res)
    })
  } catch (err) {
    console.log(err)
  }
}

export default {
  login,
  register,
  getCustomerData,
  createOrder,
  getOrdersByStatus,
  getPrice,
  finishOrder
}
