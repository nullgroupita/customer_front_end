import axios from 'axios'
import cookies from 'vue-cookies'
import store from '../store'

axios.defaults.baseURL = 'http://18.179.142.236:9000/customers/'
axios.defaults.timeout = 5000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  config => {
    let token = store.state.token
    if (token) {
      config.headers = {
        'Token': token
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(error)
  }
)

export default axios
