/*
 * @Author: your name
 * @Date: 2021-01-06 14:51:18
 * @LastEditTime: 2022-03-06 17:58:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /practice-ui/src/modules/demo/dise-list-b/dise-list-b-mngr.router.js
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
export default {
  // path 保证全局唯一
  path: '/template/list',
  component: () => import('@/modules/codetemplate/list/index.vue'),
  // typeList 中编写模块所需二级代码
  meta: { typeList: ['ICM_DISE_TYPE', 'VALI_FLAG'] }
}
