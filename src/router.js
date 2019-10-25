import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: "",
          name:"spectrumanalysis",
          component: () => import('@/views/SpectrumAnalysis.vue')
        },
        {
          path: "parametersetting",
          name: "parametersetting",
          component: () => import('@/views/ParameterSetting.vue')
        },
        {
          path: "bearingdata",
          name: 'bearingdata',
          component: () => import('@/views/BearingData.vue')
        },
        {
          path: "systemsetup",
          name: "systemsetup",
          component: () => import('@/views/SystemSetup.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
