<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-06 17:52:40
 * @Description:
-->
<template>
  <div>
      <componentsBasic></componentsBasic>
  </div>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'
import componentsBasic from '@/modules/codetemplate/componentBasic/index.vue'
export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
  components: {
    componentsBasic
  },
  data () {
    return {}
  },
  methods: {
    clicknow (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.red {
  color: red;
}
.blue {
  color: blue;
  font-size: 100px;
}
</style>
