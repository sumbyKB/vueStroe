const INIT_VEHICLE = 'INIT_VEHICLE'

const state = {
  data: []
}

const actions = {
  initVehicle ({ commit }, payload) {
    commit(INIT_VEHICLE, payload)
  }
}

const mutations = {
  [INIT_VEHICLE] (state, payload) {
    state.data = payload
  }
}

export default {
  state,
  actions,
  mutations
}
