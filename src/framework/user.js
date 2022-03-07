/*
 * @Author: your name
 * @Date: 2021-08-20 13:32:22
 * @LastEditTime: 2022-03-06 23:23:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /data_check_UI/src/framework/user.js
 */
/*
 * Created: 2019-09-14
 * Author: zhao.dp (zhao.dp@neusoft.com)
 * Description: 登录/获取用户信息服务
 * -----
 * Last Modified: 2019-09-14 2:56:26 pm
 * Modified By: zhao.dp (zhao.dp@neusoft.com>)
 */
import NCP from '@ncp-web/core'

const ADMIN_CONTEXT = process.env.VUE_APP_BASE_URL

// 当前用户信息
const currentUserRes = NCP.createAxios({
  baseURL: ADMIN_CONTEXT + '/userinfo/getCurrentUser'
})

// eslint-disable-next-line space-before-function-paren
export function getCurrentUserInfo() {
  return currentUserRes.request({
    method: 'get'
  })
}
