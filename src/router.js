/*
 * @Author: your name
 * @Date: 2022-02-24 20:52:55
 * @LastEditTime: 2022-03-06 22:39:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/router.js
 */
import Vue from 'vue'
import Router from 'vue-router'
import modulesRoutes from '@/modules/router.js'
import catalog from '@/modules/catalog/catalog.vue'
Vue.use(Router)

// 基础路由信息
const routes = [{
  path: '/',
  name: 'home',
  component: catalog
},
{
  path: '/404',
  component: () => import('@/common/pages/core/error-page/404.vue'),
  hidden: true
}
]
routes.push({
  path: '*',
  redirect: '/404',
  hidden: true
})
// 模块路由信息
routes.push(...modulesRoutes)
// console.log(routes)

export default new Router({
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: routes
})
