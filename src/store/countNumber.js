import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () =>({
  count: ''
})

export const getters = {

  count(state) {
    return state.count
  },
}