/*
 * @Author: your name
 * @Date: 2022-02-25 20:32:37
 * @LastEditTime: 2022-03-02 10:52:14
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/common/filters/framework/index.js
 */
import dateFormat from 'dateformat'
import NCP from '@ncp-web/core'

export function tableDataFilter (val, rowdata, format) {
  if (!val) return ''
  return dateFormat(new Date(val), format)
}

export function codeFilter (value, type) {
  if (
    value == null ||
    value === undefined ||
    value === '' ||
    type == null ||
    type === undefined ||
    type === ''
  ) { return '' }
  type = type.toUpperCase()
  let res
  try {
    res = NCP.codeHandle.selectCodeName(value, type)
    if (res == null || res === undefined) return value
    return res
  } catch (e) {
    return value
  }
}
