<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-07 19:43:07
 * @Description:
-->
<template>
  <div>
    <h2>EventBus接收组件</h2>
    {{msg}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    this.$EventBus.$on('aMsg', (msg) => {
      // A发送来的消息
      this.msg = msg
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
