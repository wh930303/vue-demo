<!--
 * @Author: boy
 * @Date: 2020-12-14 10:15:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-01 21:44:37
 * @Description: file content
-->
<template>
  <el-block>
    <el-panel title="目录">
      <el-row :gutter="20">
        <el-col
          layout-size="large"
          v-for="(item, index) in routesList"
          :key="index"
        >
          <a :href="'/#' + item.path" target="_blank" class="link">
            <span v-if="item.meta && item.meta.title">
              {{ item.meta.title }}
            </span>
            <span v-else-if="item.path != '/catalog'">{{ item.path }}</span>
          </a>
        </el-col>
      </el-row>
    </el-panel>
  </el-block>
</template>

<script>
import routes from '@/router.js'
export default {
  data () {
    return {
      routesList: []
    }
  },
  mounted () {
    this.routesList = routes.options.routes
  }
}
</script>

<style lang="scss" scoped>
.link {
  font-size: 18px;
}
</style>
