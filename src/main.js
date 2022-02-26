/*
 * @Author: your name
 * @Date: 2022-02-24 20:52:55
 * @LastEditTime: 2022-02-26 11:13:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/main.js
 */
import '@babel/polyfill'
// 核心组件
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import LocalUI from '@ncp-web/element-ui-local'
// 工程初始化
import '@/framework/app-init.js'
// store 必需要放在工程初始化之后执行，否则拦截器不生效
import store from './store/store'
// 路由守卫
import '@/framework/router-guard/router-guard.js'
// 图标
import '@/common/icon/index.js'
// 样式
import '@/style/index.js'
// 过滤器
import * as filters from './common/filters'
// 统一框架组件
import NCP from '@ncp-web/core'
// 医保局行业线工具
import '@/common/utils/core/index.js'

Vue.use(Element)
Vue.use(LocalUI)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 绑定NCP对象
Vue.prototype.$ncp = NCP

// 阻止启动生产消息
Vue.config.productionTip = false

// render:function(createElement){
//   return createElement(App);
// }
// 在Vue构造函数时，需要配置一个el属性，如果没有el属性时，可以使用.$mount('#app')进行挂载。
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
