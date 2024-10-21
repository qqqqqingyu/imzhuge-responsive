import {createRouter, createWebHistory} from 'vue-router'
import { isMobileTerminal } from '@/utils/flexible'
import mobileTerminalRoutes from './modules/mobile-routes'
import pcTerminalRoutes from './modules/pc-routes'

// 创建 vueRouter 实例
const router = createRouter({
  history: createWebHistory(),
  // history:createWebHashHistory(),
  routes: isMobileTerminal.value ? mobileTerminalRoutes : pcTerminalRoutes
})

// 页面跳转时到顶部
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0); // 将滚动位置设置为页面顶部
  next();
});

export default router

