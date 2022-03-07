<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-07 19:41:20
 * @Description:
-->
<template>
  <div>
    <EventBusA></EventBusA>
    <EventBusB></EventBusB>
  </div>
</template>

<script>
import EventBusA from '@/common/components/eventBusA/index.vue'
import EventBusB from '@/common/components/eventBusB/index.vue'

export default {
  components: { EventBusA, EventBusB }
}
</script>

<style lang="scss" scoped>
</style>
