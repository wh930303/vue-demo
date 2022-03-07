<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-07 19:44:42
 * @Description:
-->
<template>
  <div>
    <h2>EventBus发送组件</h2>
    <button @click="sendMsg()">A组件发送消息</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 0
    }
  },
  methods: {
    sendMsg () {
      this.num++
      this.$EventBus.$emit('aMsg', `第${this.num}次来自A页面的消息`)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
