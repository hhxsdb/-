import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    // 判断是否已经添加mainbox的子路由
    isGetterRouter: false,
    // 判断是否折叠侧边导航栏
    isCollapse: false,
    // 存储用户信息
    userInfo: {
    }
  },
  getters: {
  },
  mutations: {
    // 修改 是否第一次添加路由
    changeGetterRouter(state, value) {
      state.isGetterRouter = value
    },
    // 修改 侧边导航栏折叠状态
    changeCollapse(state) {
      state.isCollapse = !state.isCollapse
    },
    // 修改 用户信息
    changeUserInfo(state, value) {
      state.userInfo = value
    },
    // 删除 用户信息
    clearUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  // 持久化存储
  plugins: [createPersistedState({
    paths: ["isCollapse", 'userInfo']
  })],
})
