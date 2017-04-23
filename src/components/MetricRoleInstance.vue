<template>
  <div class="form-container metric-role-instance" style='max-width:700px;'>
    <h1> {{user.name}} </h1>
    <h1 v-show="updateStatus.status === 500" class='error'> {{updateStatus.message}}</h1>
    <h1 v-show="updateStatus.status === 200" class='saved'> {{updateStatus.message}}</h1>
    <mriForm>
      <select >
        <option v-for="instance in metricRoleInstances" :value='instance.id'>{{instance.count}}</option> 
      </select>
    </mriForm> 
  </div>
</template>
<script>
  import MRIStore from '@/store/modules/metric_role_instance.js'
  import MRIForm from '@/components/MetricRoleInstanceForm.vue'
  export default {
    name: 'MetricRoleInstance',
    beforeCreate () {
      this.$store = MRIStore
    },
    mounted () {
      this.$store.commit('SET_USER', this.$auth.user())
      this.$store.dispatch('GET_METRIC_ROLE_INSTANCES')
    },
    data () {
      return {
        context: 'metric role instance context',
        user: this.$auth.user()
      }
    },
    computed: {
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
          return this.$store.getters.metricRoleInstances
        }
      }

    },
    components: {
      mriForm: MRIForm
    },
    methods: {
    }
  }
</script>
<style scoped>
</style>
