<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-07 00:11:46
 * @Description:
-->
<template>
  <div>
    {{ msg }}
    <!-- {{formData.name}}
    <demo></demo> -->
  </div>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'
// import demo from '@/modules/codetemplate/communication/index.vue'

export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
  // components: { demo },
  props: {},
  data () {
    return {
      msg: 'hi vue'
    }
  },
  // computed: {
  //   formData () {
  //     return this.$store.getters.formData
  //   }
  // },
  // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
  beforeCreate () {
    console.log('beforeCreate')
    setTimeout(() => {
      this.msg = 'change vue'
    }, 1000 * 3)
  },
  /* 在实例创建完成后被立即调用。
  在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。
  然而，挂载阶段还没开始，$el 属性目前不可见。 */
  created () {
    console.log('created')
  },
  // 在挂载开始之前被调用：相关的渲染函数首次被调用
  beforeMount () {
    console.log('beforeMount')
  },
  // el 被新创建的 vm.$el 替换, 挂载成功
  mounted () {
    console.log('mounted')
  },
  // 数据更新时调用
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  // 组件 DOM 已经更新, 组件更新完毕
  updated () {
    console.log('updated')
  },
  // 组件销毁前调用
  beforeDestory () {
  },
  // 组件销毁后调用
  destoryed () {
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
