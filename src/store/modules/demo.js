const state = {
  formData: {}
}

const mutations = {
  SET_FROMDATA: (state, obj) => {
    state.formData = obj
  }
}

const actions = {
  setFormData ({ commit }, obj) {
    commit('SET_FROMDATA', obj)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
