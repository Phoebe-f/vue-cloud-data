import Vue from 'vue'
import Router from 'vue-router'


import home from '@/page/home'
import exampleSchool from '@/page/exampleSchool'
import province from '@/page/province'
import city from '@/page/city'

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
          meta: { title: '数据云图首页' }
        },
        {
          path: '/exampleSchool',
          name: 'exampleSchool',
          component: exampleSchool,
          meta: { title: '全国示范校' }
        },
        {
          path: '/region',
          name: "region",
          meta: { title: '各省数据' },
          component: () => import('../page/province.vue'),
          children: [
            {
              path: 'province/:id',
              name: 'Province',
              // component: '../page/province.vue',
              component: () => import('../page/province.vue'),
              meta: {}
            },
            {
              path: 'city/:code',
              name: 'City',
              component: () => import('../page/city.vue'),
              meta: {}
            },
            {
              path: 'area',
              name: 'area',
              component: city,
              meta: {}
            },
          ]
        }


      ]
    },


  ]
})
