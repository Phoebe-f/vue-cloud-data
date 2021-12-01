import Vue from 'vue'
import Vuex from 'vuex'
import { routes } from '../router/index'

Vue.use(Vuex)


export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    // if (hasPermission(roles, tmp)) {
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children, roles)
    }
    res.push(tmp)
    // }
  })

  return res
}


const store = new Vuex.Store({
  state: {
    routes,
    queryID: 'hhh',
  },

  getters: {
    permission_routes: state => state.routes.filter((i) => i.hiddren != true)
  },

  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    changeQueryID: (state, queryPar)=>{
      state.queryID = queryPar
    }
  },

  actions: {//异步
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
})

export default store

// console.log("route")
// console.log(store.state)
// console.log("route")
