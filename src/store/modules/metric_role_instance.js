// store for metric role instance

import {Vue, axios, VueAxios} from '@/imports/store_imports.js'
Vue.use(VueAxios, axios)

const state = {
  metricRoleInstance: {},
  metricRoleInstances: []
}
const actions = {
  UPDATE_METRIC_ROLE_INSTANCE ({commit, metricRoleInstance}) {
    Vue.axios.put('http://127.0.0.1:8000/instances/' + state.metricRoleInstance.id, state.metricRoleInstance)
    .then((response) => {
      commit('UPDATE_METRIC_ROLE_INSTANCE', response.data.data.metric_role_instance)
      commit('UPDATE_STATUS', {status: 200, message: 'Stat Successfully Updated.'})
    })
    .catch(e => {
      commit('UPDATE_METRIC_ROLE_INSTANCE', state.metricRoleInstance)
      commit('UPDATE_STATUS', {status: 500, message: e.response.data.message})
    })
  },
  GET_METRIC_ROLE_INSTANCE ({commit, metricRoleInstance}) {
    Vue.axios.get('http://127.0.0.1:8000/instances/' + state.metricRoleInstance.id)
    .then((response) => {
      commit('UPDATE_METRIC_ROLE_INSTANCE', response.data.data.metric_role_instance)
    })
    .catch(e => {
      commit('UPDATE_METRIC_ROLE_INSTANCE', state.metricRoleInstance)
    })
  },
  GET_METRIC_ROLE_INSTANCES ({commit, metricRoleInstances}, filters) {
    Vue.axios.get('http://127.0.0.1:8000/instances/', {
      params: filters
    })
    .then((response) => {
      commit('GET_METRIC_ROLE_INSTANCES', response.data.data.metric_role_instances)
    })
    .catch(e => {
      commit('GET_METRIC_ROLE_INSTANCES', state.metricRoleInstances)
    })
  }
}

const mutations = {
  UPDATE_METRIC_ROLE_INSTANCE (state, metricRoleInstance) {
    state.metricRoleInstance = metricRoleInstance
  },
  GET_METRIC_ROLE_INSTANCE (state, metricRoleInstance) {
    state.metricRoleInstance = metricRoleInstance
  },
  GET_METRIC_ROLE_INSTANCES (state, metricRoleInstances) {
    state.metricRoleInstances = metricRoleInstances
  }
}

const getters = {
  metricRoleInstance: state => state.metricRoleInstance,
  metricRoleInstances: state => state.metricRoleInstances
}

export default {
  state,
  actions,
  mutations,
  getters
}
