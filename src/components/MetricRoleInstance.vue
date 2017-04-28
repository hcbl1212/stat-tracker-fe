<template>
  <div class="form-container metric-role-instance" style='max-width:700px;'>
    <h1> {{user.name}} Log Stat </h1>
    <h1 v-show="updateStatus.status === 500" class='error'> {{updateStatus.message}}</h1>
    <h1 v-show="updateStatus.status === 200" class='saved'> {{updateStatus.message}}</h1>
    <mriForm :user='user.id' :role='selectedRole' :metric='selectedMetric' :count='count'>
      <label>Roles</label>
      <select v-model='selectedRole' id="role-select">
        <option v-for='role in userAndAssociations.roles' :value='role.id' 
        :disabled="role.id === 'Select Role'">{{role.name}}</option> 
      </select>
      <label v-show='showMRIMetric'>Metrics</label>
      <select v-show='showMRIMetric' v-model='selectedMetric' id="metric-select">
        <option v-for='metric in roleAndAssociations.metrics' :value='metric.id' 
        :disabled="metric.id === 'Select Metric'">{{metric.description}}</option> 
      </select>
      <div class='field-wrap' style="width:75%;">
        <textBox v-show='showMRICount' ref="metricValue" :label='metricValueLabel'
        :textbox='metricValueInput' v-model='count' value=''></textBox>
      </div>
      <button class='button button-block create-mri font-size-x-large'>Add Logged Event</button>
    </mriForm> 
  </div>
</template>
<script>
  import store from '@/store/index.js'
  import MRIForm from '@/components/MetricRoleInstanceForm.vue'
  import InputAndLabel from '@/utilities/inputAndLabel.js'
  import TextBoxWithLabel from '@/components/TextBoxWithLabel.vue'
  export default {
    name: 'MetricRoleInstance',
    beforeCreate () {
      this.$store = store
      this.$store.commit('SET_USER', this.$auth.user())
      this.$store.dispatch('GET_USER_AND_ASSOCIATIONS')
    },
    mounted () {
      let input = new InputAndLabel({placeHolder: 'Enter Value', class: 'metricValue'}, {type: 'number', id: 'metricValue', required: true})
      this.$data[input.getLabel().dataName] = input.getLabel()
      this.$data[input.getInput().dataName] = input.getInput()
    },
    data () {
      return {
        context: 'metric role instance context',
        selectedRole: 'Select Role',
        selectedMetric: 'Select Metric',
        showMRIMetric: false,
        showMRICount: false,
        metricValueInput: {
        },
        metricValueLabel: {
        },
        count: ''
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
          console.log('create a new one')
          this.$store.dispatch('CREATE_METRIC_ROLE_INSTANCE', metricRoleInstance)
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
      mriForm: MRIForm,
      textBox: TextBoxWithLabel
    },
    methods: {
    },
    watch: {
      selectedMetric (val) {
        // we need to reset the count if this value changes
        this.$store.dispatch('GET_METRIC_ROLE_INSTANCES', {user: this.user.id, metric: this.selectedMetric, role: this.selectedRole})
        this.showMRICount = true
      },
      selectedRole (val) {
        this.$store.dispatch('GET_ROLE_AND_ASSOCIATIONS', val)
        this.selectedMetric = 'Select Metric'
        this.showMRIMetric = true
      }
    }
  }
</script>
<style scoped>
</style>
