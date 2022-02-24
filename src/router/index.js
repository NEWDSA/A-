import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */

/**
 * path:'/'                       url路径
 * hidden: true                   不显示在左侧菜单列表
 * component:Layout               加载的vue组件
 * name:'router-name'             vue-router 路由名称
 * meta : {
    title: 'title'               左侧菜单标题
    icon: 'svg-name'             左侧菜单图标
    affix：false                 是否固定于Tags中，默认为false
    noCache:false                不缓存组件信息，默认为false缓存信息， 设置为true则表示不存组件信息
    noScroll:false               模板组件不出现el-scrollbar滚动，默认为false出现滚动组件， 设置为true则表示不需要出现滚动组件
  }
  children : []                  子节点
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  {
    path: '/',
    component: () => import('@/views/Home'),
    redirect: '/Home'

  },
  {
    path: '/Modify',
    component: () => import('@/views/login/Modify'),
  },
  {
    path: '/Message',
    component: () => import('@/views/Message/index.vue'),
  },
  //消息詳情
  {
    path: '/Message/details',
    component: () => import('@/views/Message/details.vue'),
  },
  {
    path: '/Customer',
    component: () => import('@/views/Customer/index.vue'),
  },

  {
    path: '/AddCustomer', //添加客戶
    component: () => import('@/views/Customer/add.vue'),
  },
  {
    path: '/CustomerDetail', //客戶详情
    component: () => import('@/views/Customer/details.vue'),
  },

  {
    path: '/Home',
    component: () => import('@/views/Home'),
  },
  {
    path: '/Mine',
    component: () => import('@/views/login/mine'),
  },
  {
    path: '/Login',
    component: () => import('@/views/login/index'),
  },
  {
    path: '/details',
    name: 'details',
    component: () => import('@/views/House/details.vue'),
  },
  {
    path: '/House',
    name: 'House',
    component: () => import('@/views/House'),
    meta: {
      showTab: false //如果需要显示就加上这个
    }
  },
  {
    path: '/EditHouse',
    name: 'EditHouse', //編輯房源
    component: () => import('@/views/House/edit.vue'),
  },
  {
    path: '/House?from=home',
    component: () => import('@/views/Home'),
    meta: {
      showTab: true //如果需要显示就加上这个
    }
  },
  {
    path: '/More', //更多
    component: () => import('@/views/More/index.vue'),
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('@/views/Search/index.vue')
  },
  {
    path: '/saveSearch',
    component: () => import('@/views/saveSearch')
  },
  // 新增跟進
  {
    path: '/AddFollow',
    name: 'AddFollow',
    component: () => import('@/views/AddFollow/index.vue')
  },
  //選擇提醒人
  {
    path: '/SelectPerson',
    name: 'SelectPerson',
    component: () => import('@/views/SelectPerson'),
    meta: {
      title: '選擇提醒人'
    }
  },
  // 更多跟進
  {
    path: '/MoreFollow',
    name: 'MoreFollow',
    meta: {
      title: '更多跟進人'
    },
    component: () => import('@/views/More/follow.vue')
  },
  //带看记录
  {
    path: '/LookRecord',
    name: 'LookRecord',
    component: () => import('@/views/LookRecord/index.vue')
  },
  // 錄入帶看
  {
    path: '/AddLook',
    name: 'AddLook',
    component: () => import('@/views/AddLook')
  },
  //現場相
  {
    path: '/Scene',
    name: 'Scene',
    component: () => import('@/views/Scene/index.vue')
  },
  //編輯現場相
  {
    path: '/EditScene',
    name: 'EditScene',
    component: () => import('@/views/Scene/edit.vue')
  },
  //新增現場相
  {
    path: '/AddScene',
    name: 'AddScene',
    component: () => import('@/views/Scene/add.vue')
  },
  // 放盤紙
  {
    path: '/PutPaper',
    name: 'PutPaper',
    component: () => import('@/views/PutPaper/index.vue')
  },
  // 新增放盤紙
  {
    path: '/AddPutPaper',
    name: 'AddPutPaper',
    component: () => import('@/views/PutPaper/add.vue')
  },
  // 查冊
  {
    path: '/SeeBook',
    name: 'SeeBook',
    component: () => import('@/views/SeeBook/index.vue')
  },
  // 新增查冊
  {
    path: '/AddSeeBook',
    name: 'AddSeeBook',
    component: () => import('@/views/SeeBook/add.vue')
  }

]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
