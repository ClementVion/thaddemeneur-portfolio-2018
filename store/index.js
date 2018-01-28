import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      currentProjectIndex: 0
    },
    mutations: {
      change (state, index) {
        state.currentProjectIndex = index
      }
    }
  })
}

export default createStore
