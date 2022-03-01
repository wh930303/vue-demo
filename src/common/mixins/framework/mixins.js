/*
 * @Author: your name
 * @Date: 2022-02-25 20:32:37
 * @LastEditTime: 2022-03-01 19:48:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue-demo/src/common/mixins/framework/mixins.js
 */
export default {
  data () {
    return {
      tableMaxHeight: '500px'
    }
  },
  mounted () {
    setTimeout(this.$autoInit)
    window.onresize = () => {
      this.$autoInit()
    }
  },
  methods: {
    $getByClass (oParent, sClass) {
      let aResult = []
      let aEle = oParent.children

      for (let i = 0; i < aEle.length; i++) {
        if (aEle[i].className.indexOf(sClass) >= 0) {
          aResult.push(aEle[i])
        }
      }
      return aResult
    },
    $getByClassForAll (oParent, sClass) {
      let aResult = []
      let aEle = oParent.getElementsByTagName('div')

      for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className.indexOf(sClass) >= 0) {
          aResult.push(aEle[i])
        }
      }
      return aResult
    },
    $autoInit () {
      const container = document.getElementById('adaptive-container')
      const autoPaneList = this.$getByClass(container, 'adaptive-pane-auto')
      const fixList = this.$getByClass(container, 'adaptive-pane-fix')
      let fixPartHeight = 0

      for (let j = 0; j < fixList.length; j++) {
        fixPartHeight += fixList[j].clientHeight
      }
      const autoPaneHeight =
        (document.documentElement.clientHeight - fixPartHeight) /
        (autoPaneList.length === 0 ? 1 : autoPaneList.length) +
        'px'

      for (let i = 0; i < autoPaneList.length; i++) {
        autoPaneList[i].style.height = autoPaneHeight
        this.$eltabPaneHeight(autoPaneList[i], autoPaneHeight)
      }
    },
    $eltabPaneHeight (autoPane, autoPaneHeight) {
      const eltabpaneList = this.$getByClassForAll(autoPane, 'el-tab-pane')
      const eltabsList = this.$getByClassForAll(autoPane, 'el-tabs__header')
      const elcollapseeltabsList = this.$getByClassForAll(
        autoPane,
        'el-collapse-item__header'
      )
      const autoZoneHeight =
        (parseFloat(autoPaneHeight) -
          48 * elcollapseeltabsList.length -
          55 * eltabsList.length) /
        (eltabsList.length === 0 ? 1 : eltabsList.length) +
        'px'
      for (let i = 0; i < eltabpaneList.length; i++) {
        eltabpaneList[i].style.height = autoZoneHeight
      }

      this.tableMaxHeight = parseFloat(autoZoneHeight) - 32 + 'px'
    }
  }
}
