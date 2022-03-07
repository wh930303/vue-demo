<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-06 23:53:03
 * @Description:
-->
<template>
  <el-block-container>
    <el-block>
      <el-panel title="测试Vuex">
        <el-form
          ref="form"
          :model="formData"
          label-position="right"
          label-width="125px"
          size="medium"
          @submit.native.prevent
        >
          <el-row>
            <el-col layout-size="large">
              <el-form-item label="name">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col layout-size="large">
              <el-form-item label="age">
                <el-input v-model="formData.age"></el-input>
              </el-form-item>
            </el-col>
            <el-col layout-size="large">
              <el-form-item label="tel">
                <el-input v-model="formData.tel"></el-input> </el-form-item
            ></el-col>
            <el-col layout-size="large">
              <el-form-item>
                <el-button @click="setFormData">保存</el-button>
              </el-form-item></el-col
            >
          </el-row>
        </el-form>
      </el-panel>
    </el-block>
  </el-block-container>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'

export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
  data () {
    return {
      formData: {
        name: '',
        age: '',
        tel: ''
      }
    }
  },
  created () {
    console.log(this.$store)
    console.log(this.$store.getters.user)
  },
  methods: {
    setFormData () {
      this.$store.dispatch('demo/setFormData', this.formData)
      console.log(this.$store.getters.formData)
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
