// store for metric role instance

import {Vue, axios, VueAxios} from '@/imports/store_imports.js'
Vue.use(VueAxios, axios)

const state = {
  role: {},
  roles: {},
  roleAndAssociations: []
}
const actions = {
  UPDATE_ROLE ({commit, role}) {
    Vue.axios.put('http://127.0.0.1:8000/roles/' + state.role.id, state.role)
    .then((response) => {
      commit('UPDATE_ROLE', response.data.data.role)
      commit('UPDATE_STATUS', {status: 200, message: 'Role Successfully Updated.'})
    })
    .catch(e => {
      commit('UPDATE_ROLE', state.role)
      commit('UPDATE_STATUS', {status: 500, message: e.response.data.message})
    })
  },
  GET_ROLE_AND_ASSOCIATIONS ({commit, role}, id) {
    let idToUse = id || state.user.id
    Vue.axios.get('http://127.0.0.1:8000/full/roles/' + idToUse)
    .then((response) => {
      commit('GET_ROLE_AND_ASSOCIATIONS', response.data.data.role)
    })
    .catch(e => {
      commit('GET_ROLE_AND_ASSOCIATIONS', state.roleAndAssociations)
    })
  },
  GET_ROLE ({commit, role}, id) {
    Vue.axios.get('http://127.0.0.1:8000/roles/' + id)
    .then((response) => {
      commit('UPDATE_ROLE', response.data.data.role)
    })
    .catch(e => {
      commit('UPDATE_ROLE', state.role)
    })
  },
  GET_ROLES ({commit, roles}) {
    Vue.axios.get('http://127.0.0.1:8000/roles/')
    .then((response) => {
      commit('GET_ROLES', response.data.data.roles)
    })
    .catch(e => {
      commit('GET_ROLES', state.roles)
    })
  }
}

const mutations = {
  UPDATE_ROLE (state, role) {
    state.role = role
  },
  GET_ROLE_AND_ASSOCIATIONS (state, roleAndAssociations) {
    state.roleAndAssociations = roleAndAssociations
  },
  GET_ROLE (state, role) {
    state.role = role
  },
  GET_ROLES (state, roles) {
    state.roles = roles
  }
}

const getters = {
  role: state => state.role,
  roles: state => state.roles,
  roleAndAssociations: state => state.roleAndAssociations
}

export default {
  state,
  actions,
  mutations,
  getters
}
