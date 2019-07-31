import Vue from 'vue'
// 12
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import axios from 'axios'
import Element from 'element-ui'
import './styles/element-variables.scss'
import Qs from 'qs'
import request from '@/utils/request'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import { getPer } from '@/utils/auth'
import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

router.beforeEach((to, from, next) => {
  const per = getPer()
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (per.indexOf(to.name) > -1) { // 判断当前的token是否存在
      next()
    } else {
      next({
        path: '/404',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

axios.defaults.withCredentials = false // 解决跨域
Vue.prototype.$http = axios
Vue.prototype.serverUrl = 'http://localhost:7788/api'
Vue.prototype.$qs = Qs
Vue.prototype.request = request
Vue.prototype.headconfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
