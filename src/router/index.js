import Vue from 'vue'
import Router from 'vue-router'


import home from '@/page/home'
import exampleSchool from '@/page/exampleSchool'
import province from '@/page/province'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: "layout",
      path: '/',
      component: () => import('@/layout'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
          meta: { title: '数据云图首页'}
        },
        {
          path: '/exampleSchool',
          name: 'exampleSchool',
          component: exampleSchool,
          meta: { title: '全国示范校' }
        },
        {
          path: '/province/:id',
          name: 'province',
          component: province,
          meta: {  }
        },
      ]
    },


  ]
})
