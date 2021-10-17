import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'amfe-flexible'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import permission from '@/directive/permission/index.js' // 权限判断指令
import vant from 'vant' // 引入Vant
import 'vant/lib/index.css';


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
import '@/mock'


Vue.use(vant);
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
// 全局注册权限控制Permission指令
Vue.directive('permission', permission)
// 全局引入jquery
Vue.config.productionTip = false
Vue.prototype.$tabbar_b = true
Vue.prototype.$arrow = true
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
