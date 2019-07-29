import api from '../api'

const login = (context, params) => {
    api.login(params)
}

const register = (context, params) => {
    api.register(params)
}

export default {
    login,
    register
}