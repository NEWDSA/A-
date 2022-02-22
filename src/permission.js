import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  const userinfo = await store.dispatch('authorize/getUserInfo')
  //dispatch 可以解決异步操作
  //dispatch 的作用是触发 mutations，并且触发 mutations 后，会返回一个 Promise，
  if (userinfo && userinfo != null) {
    next()
  }
})