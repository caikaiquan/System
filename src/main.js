import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import '@/assets/css/base.scss'
import '@/assets/css/public.css'
// import '@/assets/css/styles.scss'
import '@/assets/iconfont/iconfont.css'
import Echarts from 'echarts'
import EchartsGl from 'echarts-gl'

Vue.config.productionTip = false
Vue.prototype.$echarts = Echarts
Vue.prototype.$echartsgl = EchartsGl

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
