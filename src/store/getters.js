/*
 * @Author: your name
 * @Date: 2022-02-25 20:12:42
 * @LastEditTime: 2022-03-07 09:53:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/store/getters.js
 */
const getters = {
  user: state => state.user.info,
  formData: state => state.demo.formData
}
export default getters
