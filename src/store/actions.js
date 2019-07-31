import api from '../api'

const login = (context, params) => {
  api.login(params)
}

const register = (context, params) => {
  api.register(params)
}

const getCustomerData = (context) => {
  api.getCustomerData()
}

const createOrder = (context, params) => {
  api.createOrder(params)
}

const getOrdersByStatus = (context, params) => {
  api.getOrdersByStatus(params)
}

const finishOrder = (context, params) => {
  api.finishOrder(params)
}

export default {
  login,
  register,
  getCustomerData,
  getOrdersByStatus,
  createOrder,
  finishOrder
}
