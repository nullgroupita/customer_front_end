import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Register from '../views/Register'
import Home from '../views/Home'
import CreateOrder from '../components/orders/CreateOrder'
import LIstOrder from '../components/orders/ListOrder'
import OrderDetail from '../components/orders/OrderDetail'
import AboutMe from '../components/orders/AboutMe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'default',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          component: CreateOrder
        },
        {
          path: '/create-order',
          component: CreateOrder
        },
        {
          path: '/list-order',
          component: LIstOrder
        },
        {
          path: '/order-detail',
          component: OrderDetail
        },
        {
          path: '/about-me',
          component: AboutMe
        }
      ]
    }
  ]
})
