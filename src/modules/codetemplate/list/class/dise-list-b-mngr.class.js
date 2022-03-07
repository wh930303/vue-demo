/*
 * @Author: your name
 * @Date: 2022-03-01 21:20:43
 * @LastEditTime: 2022-03-01 21:25:41
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/modules/demo/class/dise-list-b-mngr.class.js
 */
class DiseListBClass {
  constructor (
    diseListId,
    diseCode,
    diseName,
    icmDiseType,
    begntime,
    endtime,
    valiFlag,
    pinyin,
    wubi,
    engName,
    memo,
    rid,
    crter,
    crterName,
    crteTime,
    crteOptins,
    opter,
    opterName,
    optTime,
    optins,
    ver
  ) {
    this.diseListId = diseListId
    this.diseCode = diseCode
    this.diseName = diseName
    this.icmDiseType = icmDiseType
    this.begntime = begntime
    this.endtime = endtime
    this.valiFlag = valiFlag
    this.pinyin = pinyin
    this.wubi = wubi
    this.engName = engName
    this.memo = memo
    this.rid = rid
    this.crter = crter
    this.crterName = crterName
    this.crteTime = crteTime
    this.crteOptins = crteOptins
    this.opter = opter
    this.opterName = opterName
    this.optTime = optTime
    this.optins = optins
    this.ver = ver
  }
}

export default DiseListBClass
