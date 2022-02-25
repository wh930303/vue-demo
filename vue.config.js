/*
 * @Author: your name
 * @Date: 2022-02-24 21:14:04
 * @LastEditTime: 2022-02-25 10:35:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/vue.config.js
 */
module.exports = {
  outputDir: process.env.VUE_APP_ID,
  publicPath: './',
  devServer: {
    open: true,
    // public: '10.123.7.39:8087',
    port: 8099,
    disableHostCheck: true,
    proxy: {
      '/dev': {
        target: 'http://localhost:8888/hsa_seed',
        changeOrigin: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
  }
}
