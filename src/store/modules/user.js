// store for user

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(Vuex)

const state = {
  user: {}
}

const actions = {
  SET_USER ({ commit, user }) {
    commit('SET_USER', user)
  },
  UPDATE_USER ({ commit, state }) {
    Vue.axios.put('http://127.0.0.1:8000/users/' + state.user.id, state.user)
    .then((response) => {
      commit('UPDATE_USER', response.data.data.user)
    })
    .catch(e => {
      console.dir('error updateing user')
      console.dir(e)
    })
  }
}

const mutations = {
  SET_USER (state, user) {
    state.user = user
  },
  UPDATE_USER (state, user) {
    state.user = user
  }
}

const getters = {
  user: state => state.user
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
