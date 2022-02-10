// 引入api
import aplush from "@/api/A+";
import Vue from "vue";

const state = {
  //未讀消息數
  unread_count: 0
}
// mutations 和 actions 只能在同步函数中使用
// mutations 和 actions 的區別
// mutations 只能修改 state 中的值
// actions 可以触发多个 mutations
// mutations 只能操作state中的數據
const mutations = {
  //設置未讀消息數
  set_unread_count(state, count) {
    console.log('set_unread_count');
    console.log(count);
    // state.unread_count=count
    Vue.set(state,'unread_count',count)
  }
}

// actions 可以操作state中的數據，但是不能直接操作mutations
// actions 的作用是触发mutations
const actions = {
  //獲取未讀消息數
  async get_unread_count({
    commit
  }) {

    aplush.apis.unReaderMsg().then(res => {
      commit('set_unread_count', res.Result)
    })
  }

  // set_unread_count({commit},count){
  //     aplush.unReaderMsg().then(res=>{
  //         commit('set_unread_count',res.Result)
  //     })
  // }
}

// getters 可以讀取state中的數據
// getters 的作用 可以讓外界只能讀取state中的數據

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
