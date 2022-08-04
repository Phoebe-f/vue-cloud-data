import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// import {mapActions } from "vuex"
const token = {
  admin: {
    id: "111"
  }
}
// console.log(this)

// judegUser()
function judegUser() {
  // console.log(st)
  if (token.admin.id === "111") {
    // this.$store.acitons.generateRoutes(this.$store.state.routes)
  }
}

export default judegUser