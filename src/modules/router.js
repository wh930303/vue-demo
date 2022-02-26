/*
 * Created: 2019-08-18
 * Author: zhao.dp (zhao.dp@neusoft.com)
 * Description: 统一加载模块路由信息
 * -----
 * Last Modified: 2019-08-18 9:04:56 am
 * Modified By: zhao.dp (zhao.dp@neusoft.com>)
 */
const routes = []

// 获取模块目录上下文
const modulesFiles = require.context('./', true, /\.router.js$/)

// 统一加载路由信息
modulesFiles.keys().forEach(modulePath => {
  const value = modulesFiles(modulePath)
  routes.push(value.default)
})

export default routes
