/*
 * @Author: your name
 * @Date: 2021-08-20 13:32:22
 * @LastEditTime: 2022-03-02 11:21:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /data_check_UI/src/framework/app-init.js
 */
/*
 * Created: 2019-08-15
 * Author: zhao.dp (zhao.dp@neusoft.com)
 * Description: 应用初始化
 * -----
 * Last Modified: 2019-08-16 3:28:55 pm
 * Modified By: zhao.dp (zhao.dp@neusoft.com>)
 */
import NCP from '@ncp-web/core'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import Vue from 'vue'
import {
  portalMessageSend
} from '@ncp-web/portal-communication'
import {
  printErr
} from '@/common/utils/core/console.js'

NProgress.configure({
  showSpinner: false
})

// 先设置 appId；
NCP.config.init({
  appId: process.env.VUE_APP_ID
})

// 添加全局 response 拦截器
NCP.interceptor.response.use(
  // 成功回掉
  res => {
    // 关闭进度条
    NProgress.done()
    // 获取返回数据
    const data = res.data
    // 如果是附件下载类的请求则直接返回二进制数据
    if (
      res.headers &&
      res.headers['content-disposition'] &&
      res.headers['content-disposition'].toLowerCase().includes('attachment;filename=')
    ) {
      return res
    } else {
      if (data.hasOwnProperty('code')) {
        if (data.code === -4) {
          // 超时，直接将信息发送给 portal，hsa-seed 不做任何处理
          portalMessageSend.notifySessionTimeout({
            content: 'session timeout'
          })
        } else if (data.code !== 0) {
          return Promise.reject(new Error(JSON.stringify(data) || 'Error'))
        } else {
          return data.data
        }
      } else {
        return Promise.reject(new Error('返回数据格式不正确！'))
      }
    }
  },
  // 失败回掉
  err => {
    NProgress.done()
    // 如果是开发模式则在控制台输出完整的错误信息
    printErr('请求错误：' + err)
    // 对于客户端的错误进行提示，服务端的错误一律提示“网络错误”
    if (err.response.status === '400') {
      return Promise.reject(new Error('请求有误，当前请求无法被服务器理解！'))
    } else if (err.response.status === '401') {
      return Promise.reject(new Error('当前请求需要用户验证！'))
    } else if (err.response.status === '403') {
      return Promise.reject(new Error('该用户无权访问此接口！'))
    } else if (err.response.status === '404') {
      return Promise.reject(
        new Error('请求所希望得到的资源未被在服务器上发现！')
      )
    } else if (err.response.status === '405') {
      return Promise.reject(
        new Error('请求有误，该请求方法不能被用于请求相应的资源。')
      )
    } else {
      return Promise.reject(new Error('网络错误！'))
    }
  }
)

// 添加全局 request 拦截器
NCP.interceptor.request.use(
  // 发送成功前
  request => {
    if (request.config && request.config.headers.polling) return request
    NProgress.start()
    return request
  },
  // 发送失败
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 设置医保局核心包对象
Vue.prototype.$hsa = {}
