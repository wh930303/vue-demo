/*
 * @Author: your name
 * @Date: 2022-02-25 20:32:37
 * @LastEditTime: 2022-03-01 19:48:22
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/common/utils/core/console.js
 */
export function printErr (message, err) {
  if (process.env.VUE_APP_ENV === 'development') { console.error('[hsa-error]', message, err) }
}

export function printInfo (message, info) {
  if (process.env.VUE_APP_ENV === 'development') { console.info('[hsa-info]', message, info) }
}
