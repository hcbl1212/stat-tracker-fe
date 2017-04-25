import {Vue, Vuex} from '@/imports/store_imports.js'
import user from '@/store/modules/user.js'
import role from '@/store/modules/role.js'
import metricRoleInstance from '@/store/modules/metric_role_instance.js'
import * as getters from '@/store/getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    role,
    metricRoleInstance
  }
})
