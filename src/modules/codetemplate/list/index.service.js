/*
 * @Author: your name
 * @Date: 2022-03-01 21:20:43
 * @LastEditTime: 2022-03-01 21:25:06
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/modules/demo/dise-list-b/dise-list-b-mngr.service.js
 */
/*
* Created: 2021-01-06
* Author: wanghao
* Description:
* -----
* Modified: 2021-01-06
* Modified By: wanghao
* Description:
*/

import NCP from '@ncp-web/core'
// import { codeFilter, tableDataFilter } from '@/common/filters/index'

// 业务服务上下文，必需设置为 process.env.VUE_APP_BASE_URL
const context = process.env.VUE_APP_BASE_URL

// 针对特定资源，创建 axios 实例
const resourcesConst = NCP.createAxios({
  baseURL: context + '/web/demo/diseListB',
  headers: { businessId: 'diseListBbusinessId' }
})

// 针对特定资源，创建资源访问对象
// 对象变量应同资源同名
const resources = {
  // 好用的POS请求示例
  // return empInsuMergeRes.post('/updateEmpMergeInfo', formEdit, {
  //   headers: { 'Content-Type': 'application/json' }
  // })

  // 查询
  get (diseListBQuery) {
    // 发送请求
    return resourcesConst.request({
      method: 'GET',
      params: diseListBQuery,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  // 分页查询
  getByPage (diseListBQuery, pageConfig) {
    // 发送请求
    return resourcesConst.request({
      url: '/page',
      method: 'GET',
      params: Object.assign({}, pageConfig, diseListBQuery),
      headers: { 'Content-Type': 'application/json' }
    })
  },
  post (diseListB) {
    return resourcesConst.request({
      method: 'POST',
      data: diseListB,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  put (diseListB) {
    return resourcesConst.request({
      method: 'PUT',
      data: diseListB,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  delete (id) {
    return resourcesConst.request({
      url: '/' + id,
      method: 'DELETE'
    })
  }
}

export default {
  resources
}
