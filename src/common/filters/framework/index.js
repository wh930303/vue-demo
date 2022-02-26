/*
 * @Author: your name
 * @Date: 2021-08-20 13:32:22
 * @LastEditTime: 2022-02-25 21:28:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /data_check_UI/src/common/filters/framework/index.js
 */
import dateFormat from 'dateformat'
import NCP from '@ncp-web/core'

export function tableDataFilter(val, rowdata, format) {
  if (!val) return ''
  return dateFormat(new Date(val), format)
}

export function codeFilter(value, type) {
  if (
    value == null ||
    value == undefined ||
    value == '' ||
    type == null ||
    type == undefined ||
    type == ''
  ) {
    return ''
  }
  type = type.toUpperCase()
  let res
  try {
    res = NCP.codeHandle.selectCodeName(value, type)
    if (res == null || res == undefined) return value
    return res
  } catch (e) {
    return value
  }
}

export function getValueByKey(key, dataItem) {
  if (
    key == null ||
    key == undefined ||
    key == '') {
    return ''
  }
  // 通过key获取value
  var len = dataItem.length
  for (var i = 0; i < len; i++) {
    // console.log("数据：" + dataItem[i].key + ":" + dataItem[i].value);
    if (dataItem[i].key == key) {
      return dataItem[i].value
    }
  }
  return key
}
