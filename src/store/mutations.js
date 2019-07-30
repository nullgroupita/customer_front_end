    
import {SAVE_TOKEN, SAVE_ID, ADD_FINISHED_ORDERS, ADD_UN_FINISHED_ORDERS, CLEAR_ORDERS, SET_CURRENT_ORDER} from '../common/constants/constants'

const mutations = {
  [SAVE_TOKEN] (state, token) {
    state.token = token
  },
  [SAVE_ID] (state, id) {
      state.customerId = id
  },
  [ADD_FINISHED_ORDERS] (state, orders) {
      state.finishedOrder.push(...orders)
  },
  [ADD_UN_FINISHED_ORDERS] (state, orders) {
      state.unFinishOrder.push(...orders)
  },
  [CLEAR_ORDERS] (state) {
      state.finishedOrder.splice(0, state.finishedOrder.length)
      state.unFinishOrder.splice(0, state.unFinishOrder.length)
  },
  [SET_CURRENT_ORDER] (state, data) {
      state.currentOrder = data
  }
}

export default mutations