import { createRouter, createWebHashHistory } from 'vue-router'
import RouteConfig from './config'
import store from '@/store'
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/index',
    name: 'mainbox',
    component: () => import('@/views/MainBox.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
const configRoutes = () => {
  if (!router.hasRoute('mainbox')) {
    router.addRoute({
      path: '/index',
      name: 'mainbox',
      component: () => import('@/views/MainBox.vue'),
    })
  }
  RouteConfig.forEach(item => {
    checkPermission(item) && router.addRoute('mainbox', item)
  })
}
// 控制路由添加 useritem
const checkPermission = (item) => {

  if (item.requireAdmin) {
    return store.state.userInfo.username === 'admin'
  }
  return true
}

router.beforeEach((to, from, next) => {
  // 访问登录页面直接放行
  if (to.name === 'login') {
    next()
  } else {
    // 判断是否有token
    if (!localStorage.getItem('token')) {
      // 无token跳转登录页面
      next({ path: '/login' })
    } else {
      // 有token判断是否有是第一次添加新路由
      if (!store.state.isGetterRouter) {
        router.removeRoute('mainbox')
        configRoutes()
        //跳转之前的页面
        next({
          path: to.fullPath
        })
        // 设置状态 已获取路由
        store.commit('changeGetterRouter', true)
      } else {
        // 已获取路由直接放行
        next()
      }
    }
  }
}
)

export default router
