// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import { router, routes } from './router'
import store from './store'

import axios from 'axios';

import ElementUI from 'element-ui';    // 
import 'element-ui/lib/theme-chalk/index.css';    // 


import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// import './utils/china.js'


import '@/styles/index.scss'

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// const app = new Vue({
//   router
// }).$mount('#app')
// const host = process.env.NODE_ENV === "development" ? "" : "https://www.i3done.com";
// const instance = axios.create({
//     baseURL: host
// })
// Vue.prototype.axios = instance;
