<template>
  <div class="form-container metric-role-instance" style='max-width:700px;'>
    <h1> {{user.name}} </h1>
    <h1 v-show="updateStatus.status === 500" class='error'> {{updateStatus.message}}</h1>
    <h1 v-show="updateStatus.status === 200" class='saved'> {{updateStatus.message}}</h1>
    <mriForm>
      <label>Roles</label>
      <select @change='updateRoleAndAssociations($event)'>
        <option v-for='role in userAndAssociations.roles' :value='role.id'>{{role.name}}</option> 
      </select>
      <label>Metrics</label>
      <select v-show='roleAndAssociations.metrics !== undefined'>
        <option v-for='metric in roleAndAssociations.metrics' :value='metric.id'>{{metric.description}}</option> 
      </select>
      <label>Count</label>
      <select >
        <option v-for='instance in metricRoleInstances' :value='instance.id'>{{instance.count}}</option> 
      </select>
    </mriForm> 
  </div>
</template>
<script>
  import store from '@/store/index.js'
  import MRIForm from '@/components/MetricRoleInstanceForm.vue'
  export default {
    name: 'MetricRoleInstance',
    beforeCreate () {
      this.$store = store
      this.$store.commit('SET_USER', this.$auth.user())
      this.$store.dispatch('GET_USER_AND_ASSOCIATIONS')
      this.$store.dispatch('GET_METRIC_ROLE_INSTANCES')
      this.$store.dispatch('GET_ROLES')
    },
    mounted () {
      // console.log(this.$store)
    },
    data () {
      return {
        context: 'metric role instance context'
      }
    },
    computed: {
      user: {
        get () {
          return this.$store.getters.user
        },
        set (user) {
          this.$store.dispatch('UPDATE_USER', user)
        }
      },
      userAndAssociations: {
        get () {
          return this.$store.getters.userAndAssociations
        }
      },
      updateStatus: {
        get () {
          return this.$store.getters.updateStatus
        },
        set (updateStatus) {
          this.$store.dispatch('UPDATE_STATUS', updateStatus)
        }
      },
      metricRoleInstance: {
        get () {
          return this.$store.getters.metricRoleInstance
        },
        set (metricRoleInstance) {
          this.$store.dispatch('UPDATE_METRIC_ROLE_INSTANCE', metricRoleInstance)
        }
      },
      metricRoleInstances: {
        get () {
          return this.$store.getters.getMetricRoleInstancesByUser
        }
      },
      role: {
        get () {
          return this.$store.getters.role
        },
        set (role) {
          // we are not actually updating the values
          // of the role, just the role
          this.$store.commit('UPDATE_ROLE', role)
        }
      },
      roles: {
        get () {
          return this.$store.getters.roles
        }
      },
      roleAndAssociations: {
        get () {
          return this.$store.getters.roleAndAssociations
        }
      }
    },
    components: {
      mriForm: MRIForm
    },
    methods: {
      updateRoleAndAssociations (event) {
        this.$store.dispatch('GET_ROLE_AND_ASSOCIATIONS', event.target.value)
      }
    }
  }
</script>
<style scoped>
</style>
