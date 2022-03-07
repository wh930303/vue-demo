<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-06 23:59:18
 * @Description:
-->
<template>
  <div>
    <button-counter title="title1 : " @clicknow="clicknow">
      <h2>hi...h2</h2>
    </button-counter>
    <button-counter title="title2 : "></button-counter>
  </div>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'
import Vue from 'vue'
/**
 * 因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，
 * 例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。
 **/
Vue.component('button-counter', {
  props: ['title'],
  data: function () {
    return {
      count: 0
    }
  },
  template:
    '<div class="child"><h1>hi...</h1><button @click="clickfun">{{title}} You clicked me {{ count }} times.</button><slot></slot></div>',
  methods: {
    clickfun () {
      this.count++
      this.$emit('clicknow', this.count)
    }
  }
})
export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
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
