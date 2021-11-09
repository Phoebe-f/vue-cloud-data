// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Axios from 'axios';
import VueAxios from 'vue-axios';




import ElementUI from 'element-ui';    // 
import 'element-ui/lib/theme-chalk/index.css';    // 

// import getTime from './components/getTime.js'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
import './utils/china.js'

import '@/styles/index.scss'

Vue.use(VueAxios, Axios);    //注意顺序
// Vue.prototype.$getTime = getTime

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.prototype.jsonUrl ="/static/json.json"

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// const host = process.env.NODE_ENV === "development" ? "" : "https://www.i3done.com";
// const instance = axios.create({
//     baseURL: host
// })
// Vue.prototype.axios = instance;
