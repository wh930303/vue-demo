/*
 * @Author: your name
 * @Date: 2021-08-20 13:32:22
 * @LastEditTime: 2022-03-07 09:52:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /data_check_UI/src/framework/router-guard/router-guard.js
 */
/*
 * Created: 2019-08-16
 * Author: zhao.dp (zhao.dp@neusoft.com)
 * Description: 添加全局前置路由守卫
 * -----
 * Last Modified: 2019-08-16 3:29:10 pm
 * Modified By: zhao.dp (zhao.dp@neusoft.com>)
 */
import NCP from '@ncp-web/core'
import router from '@/router.js'
import NProgress from 'nprogress'
import {
  Message
} from 'element-ui'
import {
  printErr
} from '@/common/utils/core/console.js'
import store from '@/store/store.js'

// 业务服务上下文，必需设置为 process.env.VUE_APP_BASE_URL
const context = process.env.VUE_APP_BASE_URL

// // 设置NCP默认数据转换器
NCP.setGlobalTransform(res => {
  return res
})

// const codeListLoader = NCP.loaderFactory.codeListLazy({
//   method: 'POST',
//   url: context + '/selectcodes/type',
//   versionUrl: context + '/selectcodes/version'
// })

const codeListLoader = NCP.loaderFactory.codeListLazy({
  method: 'POST',
  url: context + '/web/demo/infoCode/type',
  versionUrl: context + '/web/demo/infoCode/version'
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  try {
    if (process.env.VUE_APP_ENV !== 'development') {
      // 获取用户信息，同时通过此方法检测是否已经登录
      await store.dispatch('user/getCurrentUserInfo')
    }

    // 按需加载方式
    to.matched.forEach(async route => {
      try {
        const typeList = route.meta.typeList
        if (Array.isArray(typeList)) {
          const upperCaseTypeList = typeList.map(type => type.toUpperCase())
          await codeListLoader(upperCaseTypeList)
        }
        next()
        NProgress.done()
      } catch (err) {
        printErr('二级代码加载出错！', err)
        Message({
          message: '系统错误，请联系管理员',
          type: 'warning'
        })
        next()
        NProgress.done()
      }
    })
  } catch (err) {
    // 子应用路由守卫只要报错就不进页面
    NProgress.done()
  }
})

// 路由完成后结束进度条
router.afterEach(() => {
  NProgress.done()
})
