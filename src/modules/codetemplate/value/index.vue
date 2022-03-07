<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-06 16:49:08
 * @Description:
-->
<template>
  <div>
    <div>
      {{ msg }}
      <p>Using mustaches: {{ rawHtml }}</p>
      <p v-html="rawHtml"></p>
      <div v-bind:class="color">test...</div>
      <p>{{ number + 1 }}</p>
      <p>{{ 1 == 1 ? "YES" : "NO" }}</p>
      <p>{{ message.split("").reverse().join("") }}</p>
    </div>
  </div>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'

export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
  data () {
    return {
      msg: 'hi vue',
      rawHtml: '<span style="color:red">this is should be red</span>',
      color: 'blue',
      number: 10,
      ok: 1,
      message: 'vue'
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
