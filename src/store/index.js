import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import sing from "./module/sing";

export default new Vuex.Store({
  state: {
    singList: JSON.parse(sessionStorage.getItem('state'))
  },
  mutations: {},
  actions: {},
  modules: {
    sing
  },
  getters: {}
})
