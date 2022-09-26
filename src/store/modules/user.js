import { login } from '@/api'
const state = {
  userMsg: null,
  name: 111
}
const mutations = {
  SET_TOKEN(state, token) {
    state.userMsg = token
  }
}
const actions = {
  async asyncToken({ commit }, loginData) {
    try {
      const { data } = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
    } catch (error) {
      if (!error.reponse) {
        throw error
      }
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
