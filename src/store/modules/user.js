import { login, getUserInfoAPI } from '@/api'
const state = {
  userMsg: {},
  userInfo: {}
}
const mutations = {
  SET_USER_MSG(state, token) {
    state.userMsg = token
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data
  },
  REMOVE_USERMSG(state) {
    state.userMsg = {}
  }
}
const actions = {
  async asyncToken({ commit }, loginData) {
    try {
      const { data } = await login(loginData)
      commit('SET_USER_MSG', data)
    } catch (error) {
      if (!error.reponse) {
        throw error
      }
    }
  },
  async getUserInfo({ commit }, id) {
    // 获取用户基本信息
    const result = await getUserInfoAPI(id)
    console.log(result)
    commit('SET_USER_INFO', result.data)
  },
  logout({ commit }) {
    commit('REMOVE_USERMSG')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
