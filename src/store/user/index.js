const UPDATE_USER_WX = 'UPDATE_USER_WX'
const UPDATE_USER_YC = 'UPDATE_USER_YC'

const state = {
  wx: {},
  yc: {}
}

const actions = {
  updateUserWX ({ commit }, payload) {
    commit(UPDATE_USER_WX, payload)
  },
  updateUserYC ({ commit }, payload) {
    commit(UPDATE_USER_YC, payload)
  }
}

const mutations = {
  [UPDATE_USER_WX] (state, payload) {
    state.wx = payload
  },
  [UPDATE_USER_YC] (state, payload) {
    state.yc = payload
  }
}

export default {
  state,
  actions,
  mutations
}
