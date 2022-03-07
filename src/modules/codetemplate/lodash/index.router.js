/*
 * @Author: your name
 * @Date: 2022-03-03 17:10:18
 * @LastEditTime: 2022-03-07 15:34:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/modules/codetemplate/lst/list.router.js
 */
export default {
  // path 保证全局唯一
  path: '/template/lodash',
  component: () => import('./index.vue'),
  // typeList 中编写模块所需二级代码
  meta: { typeList: [] }
}
