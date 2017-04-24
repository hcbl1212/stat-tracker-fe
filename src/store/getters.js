export const getMetricRoleInstancesByUser = state => {
  return state.metricRoleInstance.metricRoleInstances.filter((instance) => {
    return instance.user_id === state.user.user.id
  })
}
