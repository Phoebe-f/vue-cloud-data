import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: "layout",
    component: reslove => require(['@/layout'], reslove),
    // component: () => import('@/layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: reslove => require(['../page/home.vue'], reslove),
        meta: { title: '3D One 数据云图' }
      },
    ]
  },
  {
    path: '/example',
    component: reslove => require(['@/layout'], reslove),
    redirect: '/exampleSchool',
    children: [
      {
        path: '/exampleSchool',
        name: 'exampleSchool',
        component: reslove => require(['../page/exampleSchool'], reslove),
        meta: { title: '全国示范校',roles:['admin'] }
      }
    ]
  },
  {
    path: '/region',
    name: "region",
    meta: { title: '各省数据云图' },
    component: reslove => require(['@/layout'], reslove),
    children: [
      {
        path: 'province/:id',
        name: 'Province',
        component: reslove => require(['../page/province'], reslove),
        meta: {}
      },
      {
        path: 'city/:code',
        name: 'City',
        component: reslove => require(['../page/city'], reslove),
        meta: {}
      },
      {
        path: 'area/:code',
        name: 'area',
        component: reslove => require(['../page/area'], reslove),
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

