/*
 * @Author: your name
 * @Date: 2022-02-24 21:14:04
 * @LastEditTime: 2022-03-07 18:54:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/vue.config.js
 */
module.exports = {
  outputDir: process.env.VUE_APP_ID,
  publicPath: './',
  devServer: {
    open: true, // 自动打开浏览器
    port: 8088,
    disableHostCheck: true,
    proxy: { // 代理 基于http-proxy-middleware
      '/dev': {
        target: 'http://localhost:8888/demo',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
  },
  runtimeCompiler: true
}
