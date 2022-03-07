/*
 * Created: 2021-01-04
 * Author: wanghao
 * Description:
 * -----
 * Modified: 2021-01-04
 * Modified By: wanghao
 * Description:
 */

import NCP from '@ncp-web/core'
// import { codeFilter, tableDataFilter } from '@/common/filters/index'

// 业务服务上下文，必需设置为 process.env.VUE_APP_BASE_URL
const context = process.env.VUE_APP_BASE_URL

// 针对特定资源，创建 axios 实例
const resourcesConst = NCP.createAxios({
  baseURL: context + '/web/demo/psnInfoB',
  headers: { businessId: 'psnInfoBbusinessId' }
})
// 针对特定资源，创建 axios 实例
const psnInsuDResourcesConst = NCP.createAxios({
  baseURL: context + '/web/demo/psnInsuD',
  headers: { businessId: 'psnInsuDbusinessId' }
})

// 针对特定资源，创建 axios 实例
const insuEmpInfoBResourcesConst = NCP.createAxios({
  baseURL: context + '/web/demo/insuEmpInfoB',
  headers: { businessId: 'insuEmpInfoBbusinessId' }
})

// 针对特定资源，创建 axios 实例
const medinsInfoBResourcesConst = NCP.createAxios({
  baseURL: context + '/web/demo/medinsInfoB',
  headers: { businessId: 'medinsInfoBbusinessId' }
})

// 针对特定资源，创建 axios 实例
const diseListBResourcesConst = NCP.createAxios({
  baseURL: context + '/web/demo/diseListB',
  headers: { businessId: 'diseListBbusinessId' }
})

// 针对特定资源，创建 axios 实例
const drInfoBResourcesConst = NCP.createAxios({
  baseURL: context + '/web/demo/drInfoB',
  headers: { businessId: 'drInfoBbusinessId' }
})

// 针对特定资源，创建 axios 实例
const hilistBResourcesConst = NCP.createAxios({
  baseURL: context + '/web/demo/hilistB',
  headers: { businessId: 'hilistBbusinessId' }
})

// 针对特定资源，创建 axios 实例
const medinsDeptInfoBResourcesConst = NCP.createAxios({
  baseURL: context + '/web/demo/medinsDeptInfoB',
  headers: { businessId: 'medinsDeptInfoBbusinessId' }
})

export default {
  // 普通查询（查询个人基本信息）
  getPsnInfoB (psnInfoBQuery) {
    // 发送请求
    return resourcesConst.request({
      url: '/queryAll',
      method: 'GET',
      params: psnInfoBQuery,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  // 普通查询（查询个人参保信息）
  getPsnInsuD (psnInsuDQuery) {
    // 发送请求
    return psnInsuDResourcesConst.request({
      url: '/queryAll',
      method: 'GET',
      params: psnInsuDQuery,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  // 普通查询(查询参保单位信息)
  getInsuEmpInfoB (insuEmpInfoBQuery) {
    // 发送请求
    return insuEmpInfoBResourcesConst.request({
      url: '/queryAll',
      method: 'GET',
      params: insuEmpInfoBQuery,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  // 普通查询(查询医药机构信息)
  getMedinsInfoB (medinsInfoBQuery) {
    // 发送请求
    return medinsInfoBResourcesConst.request({
      url: '/queryAll',
      method: 'GET',
      params: medinsInfoBQuery,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  // 普通查询(查询疾病诊断目录信息)
  getDiseListB (diseListBQuery) {
    // 发送请求
    return diseListBResourcesConst.request({
      url: '/queryAll',
      method: 'GET',
      params: diseListBQuery,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  // 普通查询(查询医师信息)
  getDrInfoB (drInfoBQuery) {
    // 发送请求
    return drInfoBResourcesConst.request({
      url: '/queryAll',
      method: 'GET',
      params: drInfoBQuery,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  // 普通查询(查询医保目录信息)
  getHilistB (hilistBQuery) {
    // 发送请求
    return hilistBResourcesConst.request({
      url: '/queryAll',
      method: 'GET',
      params: hilistBQuery,
      headers: { 'Content-Type': 'application/json' }
    })
  },
  // 普通查询(查询医疗机构科室信息)
  getMedinsDeptInfoB (medinsDeptInfoBQuery) {
    // 发送请求
    return medinsDeptInfoBResourcesConst.request({
      url: '/queryAll',
      method: 'GET',
      params: medinsDeptInfoBQuery,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
