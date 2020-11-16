export default {

  state: {
    singList: JSON.parse(sessionStorage.getItem('state')),
    singId: JSON.parse(sessionStorage.getItem("singId")),
    singerId: JSON.parse(sessionStorage.getItem("singerId")),
    isActive: ''
  },
  getters: {
    getSingList: state => state.singList,
    getSingId: state => state.singId,
    getIsActive: state => state.isActive
  },
  mutations: {
    setSingList: (state, data) => state.singList = sessionStorage.setItem("state", JSON.stringify(data)),
    setSingId: (state, data) => state.singId = sessionStorage.setItem("singId", data),
    setIsActive: (state, data) => state.isActive = data,
    setSingerId: (state, data) => state.singerId = sessionStorage.setItem("singerId", data)
  },
  action: {
    setSingLists({commit}) {
      commit('setSingList')
    },
    setSingIds({commit}) {
      commit('setSingId')
    },
    setIsActives({commit}) {
      commit('setIsActive')
    },
    setSingerIds({commit}) {
      commit('setSingerId')
    }
  }
}
