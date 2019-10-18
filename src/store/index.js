// 组装模块并导出 store 的地方

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger' // Vuex 自带一个日志插件用于一般的调试

import user from './user'
import vehicle from './vehicle'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    user,
    vehicle
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
