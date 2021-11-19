import Vue from 'vue'
import Router from 'vue-router'


import home from '@/page/home'
import exampleSchool from '@/page/exampleSchool'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: "layout",
    component: () => import('@/layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: home,
        meta: { title: '3D One 数据云图' }
      },

    ]
  },
  {
    path: '/exampleSchool',
    name: 'exampleSchool',
    component: exampleSchool,
    meta: { title: '全国示范校' }
  },
  {
    path: '/region',
    meta: { title: '各省数据' },
    component: () => import('@/layout'),
    children: [
      {
        path: 'province/:id',
        name: 'Province',
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
        path: 'county',
        name: 'county',
        component: () => import('../page/county.vue'),
        meta: {}
      },
    ]
  },
  {
    path: '/404',
    component: () => import('../page/404.vue'),
    meta: { title: 404 },
    hiddren: true
  },
  {
    path: '*',
    redirect: '/404',
    hiddren: true
  }
]

const router = new Router({
  routes: routes
})
export { router, routes }

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

