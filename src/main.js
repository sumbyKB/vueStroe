import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import VCharts from 'v-charts'
import cookie from 'js-cookie'
import axios from 'axios'
import './plugins/element.js'



Vue.use(VCharts)
Vue.prototype.$axios = axios
Vue.prototype.$cookie = cookie
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
