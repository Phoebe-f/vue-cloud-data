// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { router,routes } from './router'

// import axios from 'axios';
import store from './store'

import ElementUI from 'element-ui';    // 
import 'element-ui/lib/theme-chalk/index.css';    // 

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import vueSeamlessScroll from 'vue-seamless-scroll'
Vue.use(vueSeamlessScroll)

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

import '@/styles/index.scss'

import promise from 'es6-promise'
promise.polyfill()

// import judegUser from "./user/index"
// if (process.env.NODE_ENV === 'production') {
  // console.log("O9")
  import judegUser from './user/index'
  judegUser()
// }



Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载icon    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done();
});


