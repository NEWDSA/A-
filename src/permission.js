import router from './router'
import store from './store'

router.beforeEach(async (to, from, next) => {
  const userinfo = await store.dispatch('authorize/getUserInfo')
  if (userinfo && userinfo != null) {
    next()
  }
})