import Vue from 'vue'
import Vuex from 'vuex'

const routes = require('../router/index').routes

Vue.use(Vuex)


export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  console.log(res)
  return res
}


const store = new Vuex.Store({
  state: {
    routes: routes,
    queryID: 'hhh',
  },

  getters: {
    permission_routes: state => state.routes.filter((i) => i.hiddren != true)
  },

  mutations: {
    SET_ROUTES: (state, routes) => {
      // state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    changeQueryID: (state, queryPar) => {
      state.queryID = queryPar
    }
  },

  actions: {//异步
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = routes || []
        } else {
          accessedRoutes = filterAsyncRoutes(routes, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})

export default store
