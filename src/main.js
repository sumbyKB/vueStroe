import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import VCharts from 'v-charts'
import store from './store'
import './plugins/element.js'


Vue.use(VCharts)
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
