/*
 * @Author: your name
 * @Date: 2022-02-25 20:32:37
 * @LastEditTime: 2022-02-25 21:30:35
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/common/utils/core/communication/index.js
 */
export function redirect(menuId) {
  window.parent.postMessage({
      appId: process.env.VUE_APP_ID,
      action: 'redirect',
      content: menuId
    },
    process.env.VUE_APP_PORTAL_URL
  )
}

export function notify(config) {
  window.parent.postMessage({
      appId: process.env.VUE_APP_ID,
      action: 'message',
      content: config
    },
    process.env.VUE_APP_PORTAL_URL
  )
}

export function timeout() {
  window.parent.postMessage({
      appId: process.env.VUE_APP_ID,
      action: 'sessionTimeout'
    },
    process.env.VUE_APP_PORTAL_URL
  )
}
