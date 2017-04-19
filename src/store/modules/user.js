// store for user

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(Vuex)

const state = {
  user: {},
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
  }
}

const getters = {
  user: state => state.user,
  updateStatus: state => state.updateStatus
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
