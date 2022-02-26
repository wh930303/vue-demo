/*
 * @Author: your name
 * @Date: 2021-08-20 13:32:22
 * @LastEditTime: 2022-01-10 10:23:48
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /data_check_UI/src/store/modules/user.js
 */
import { getCurrentUserInfo } from '@/framework/user.js'
const state = {
  info: null
}

const mutations = {
  SET_INFO: (state, userinfo) => {
    state.info = userinfo
  }
}

const actions = {
  // 用户信息
  //   {
  //     "opterNo": "1002",
  //     "userAcctId": "1002",
  //     "userAcct": "admin",
  //     "userName": "测试用户名称",
  //     "orgUntId": "34008",
  //     "orgName": "毒贩夫妇",
  //     "orgCodg": "对对对",
  //     "poolAreaCodg": null,
  //     "admDvs": null,
  //     "prntOrgId": null
  // }

  // get user info
  getCurrentUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getCurrentUserInfo()
        .then(user => {
          if (!user) {
            reject(new Error('未获取到用户信息！'))
          }
          commit('SET_INFO', user)
          return resolve(user)
        })
        .catch(error => {
          return reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
