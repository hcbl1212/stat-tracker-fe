// store for user
import {Vue, axios, VueAxios} from '@/imports/store_imports.js'
Vue.use(VueAxios, axios)

const state = {
  user: {},
  userAndAssociations: {},
  updateStatus: {
    status: null,
    message: ''
  }
}

const actions = {
  SET_USER ({ commit, user }) {
    commit('SET_USER', user)
  },
  SET_UPDATE_STATUS ({ commit, status }) {
    commit('SET_UPDATE_STATUS', status)
  },
  UPDATE_STATUS ({ commit, state }) {
    commit('UPDATE_STATUS', state.updateStatus)
  },
  GET_USER_AND_ASSOCIATIONS ({commit, user}, id) {
    let idToUse = id || state.user.id
    Vue.axios.get('http://127.0.0.1:8000/full/users/' + idToUse)
    .then((response) => {
      commit('GET_USER_AND_ASSOCIATIONS', response.data.data.user)
    })
    .catch(e => {
      commit('GET_USER_AND_ASSOCIATIONS', state.userAndAssociations)
    })
  },
  UPDATE_USER ({ commit, state }) {
    Vue.axios.put('http://127.0.0.1:8000/users/' + state.user.id, state.user)
    .then((response) => {
      commit('UPDATE_USER', response.data.data.user)
      commit('UPDATE_STATUS', {status: 200, message: 'Profile Successfully Updated.'})
    })
    .catch(e => {
      commit('UPDATE_USER', state.user)
      commit('UPDATE_STATUS', {status: 500, message: e.response.data.message})
    })
  }
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
    state.user.originalPassword = ''
  },
  UPDATE_USER (state, user) {
    state.user = user
  },
  SET_UPDATE_STATUS (state, status) {
    state.updateStatus = status
  },
  UPDATE_STATUS (state, status) {
    state.updateStatus = status
  },
  GET_USER_AND_ASSOCIATIONS (state, userAndAssociations) {
    state.userAndAssociations = userAndAssociations
  }
}

const getters = {
  user: state => state.user,
  updateStatus: state => state.updateStatus,
  userAndAssociations: state => state.userAndAssociations
}

export default {
  state,
  actions,
  mutations,
  getters
}
