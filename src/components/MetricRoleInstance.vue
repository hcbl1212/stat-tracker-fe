<template>
  <div class="form-container metric-role-instance" style='max-width:700px;'>
    <h1> {{user.name}} </h1>
    <h1 v-show="updateStatus.status === 500" class='error'> {{updateStatus.message}}</h1>
    <h1 v-show="updateStatus.status === 200" class='saved'> {{updateStatus.message}}</h1>
    <mriForm>
      <label>Roles</label>
      <select @change='updateRoleAndAssociations($event)' v-model='selectedRole'>
        <option v-for='role in userAndAssociations.roles' :value='role.id' >{{role.name}}</option> 
      </select>
      <label v-show='roleAndAssociations.metrics !== undefined'>Metrics</label>
      <select v-show='roleAndAssociations.metrics !== undefined' v-model='selectedMetric'>
        <option v-for='metric in roleAndAssociations.metrics' :value='metric.id'>{{metric.description}}</option> 
      </select>
      <label v-show='showMRICount'>Count</label>
      <label v-show='showMRICount'>{{metricRoleInstances}}</label>
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
    },
    mounted () {
      // console.log(this.$store)
    },
    data () {
      return {
        context: 'metric role instance context',
        selectedRole: 'Select Role',
        selectedMetric: 'Select Metric',
        showMRICount: false
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
          if (this.$store.getters.userAndAssociations.roles !== undefined) {
            this.$store.getters.userAndAssociations.roles.push({name: 'Select Role', id: 'Select Role'})
          }
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
          return this.$store.getters.metricRoleInstances.map((instance) => instance.count).reduce((first, second) => first + second, 0)
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
          this.$store.getters.roles.push({name: 'Select Role'})
          return this.$store.getters.roles
        }
      },
      roleAndAssociations: {
        get () {
          if (this.$store.getters.roleAndAssociations.metrics !== undefined) {
            this.$store.getters.roleAndAssociations.metrics.push({description: 'Select Metric', id: 'Select Metric'})
          }
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
        this.selectedMetric = 'Select Metric'
        this.showMRICount = true
      }
    },
    watch: {
      selectedMetric (val) {
        // we need to reset the count if this value changes
        this.$store.dispatch('GET_METRIC_ROLE_INSTANCES', {user: this.user.id, metric: this.selectedMetric, role: this.selectedRole})
      }
    }
  }
</script>
<style scoped>
</style>
