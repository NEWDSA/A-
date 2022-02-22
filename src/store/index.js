import Vue from 'vue'
import Vuex from 'vuex'
import getters from './modules/getters'
import app from './modules/app'
import authorize from './modules/authorize'
import bage from './modules/bage'

Vue.use(Vuex)

const store = new Vuex.Store({
  // modules 的含義是：
  // 1. 將 store 分割成 modules，每個 module 可以區分不同的功能
  // 2. 將不同的 module 分開，每個 module 可以獨立管理自己的 state
  // 3. 將不同的 module 分開，每個 module 可以獨立管理自己的 getters
  // 4. 將不同的 module 分開，每個 module 可以獨立管理自己的 mutations
  // 5. 將不同的 module 分開，每個 module 可以獨立管理自己的 actions
  modules: {
    app,
    authorize,
    bage
  },
  getters
})

export default store
