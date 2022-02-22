import Vue from 'vue' // A modern alternative to CSS resets
import App from './App'
import store from './store'
import router from './router'
import '@/permission' // permission control
import permission from '@/directive/permission/index.js' // 权限判断指令
// import permission from './directive/permission/index.js'
import vant from 'vant' // 引入Vant
import "./utils/auflex.js";
import 'vant/lib/index.css';
import './assets/css/iconfont.css';
import '@vant/touch-emulator';

import {
  Toast
} from 'vant';
import {
  PullRefresh
} from 'vant';



// console.log(`%cSometime problems is not difficult like you imagine`,"color:red;font-size:20px;font-weight:bold;text-decoration:underline;cursor:pointer");
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const {
    mockXHR
  } = require('../mock')
  mockXHR()
}

Vue.use(Toast);
Vue.use(vant);
import {
  Swipe,
  SwipeItem
} from 'vant';
//按需引入

Vue.use(Swipe);
Vue.use(SwipeItem);
// 全局注册权限控制Permission指令
Vue.directive('permission', permission)
// 全局引入jquery
Vue.config.productionTip = false
//Vue.prototype.$arrow = true

// 全局引入 上拉刷新
Vue.use(PullRefresh);
// end 全局引入上拉刷新

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
