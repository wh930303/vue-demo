<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-07 17:11:55
 * @Description:
-->
<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :name="index"
      >
        <div v-for="(childItem, childIndex) in item.showList" :key="childIndex">
          <el-link
            type="primary"
            class="link-text"
            :data-clipboard-text="childItem.copyValue"
            @click="copyText"
            >{{ childItem.lable }}</el-link
          >
          <div>{{ childItem.showValue }}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'
import moment from 'moment'
import Clipboard from 'clipboard'
// moment.defaultFormat 是 ISO8601 格式 YYYY-MM-DDTHH:mm:ssZ
moment.defaultFormat = 'YYYYMMDD HH:mm:ss'
export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
  components: {},
  props: {},
  data () {
    return {
      activeNames: [],
      list: []
    }
  },
  created () {
    console.info('moment() =>', moment())
    console.info('new Date() =>', new Date())
    this.list = [
      {
        title: '日期格式化',
        showList: [
          {
            lable: '当前时间默认格式化：moment().format()',
            copyValue: 'moment().format()',
            showValue: moment().format()
          },
          {
            lable: "当前时间指定格式化：moment().format('YYYYMMDD')",
            copyValue: "moment().format('YYYYMMDD')",
            showValue: moment().format('YYYYMMDD')
          },
          {
            lable: "指定时间指定格式化：moment(毫秒数).format('YYYYMMDD')",
            copyValue: "moment(毫秒数).format('YYYYMMDD HH:mm')",
            showValue: moment(1646553913947).format('YYYYMMDD HH:mm')
          }
        ]
      },
      {
        title: '日期增加',
        showList: [
          {
            lable: "当前时间加一小时：moment().add(1, 'hours')",
            copyValue: "moment().add(1, 'hours')",
            showValue: moment().add(1, 'hours').format()
          },
          {
            lable: "当前时间加一天：moment().add(1, 'days')",
            copyValue: "moment().add(1, 'days')",
            showValue: moment().add(1, 'days').format()
          },
          {
            lable: "当前时间加一月：moment().add(1, 'months')",
            copyValue: "moment().add(1, 'months')",
            showValue: moment().add(1, 'months').format()
          },
          {
            lable: "当前时间加一年：moment().add(1, 'years')",
            copyValue: "moment().add(1, 'years')",
            showValue: moment().add(1, 'years').format()
          }
        ]
      },
      {
        title: '日期减少',
        showList: [
          {
            lable: "当前时间减一小时：moment().subtract(1, 'hours')",
            copyValue: "moment().subtract(1, 'hours')",
            showValue: moment().subtract(1, 'hours').format()
          },
          {
            lable: "当前时间减一天：moment().subtract(1, 'days')",
            copyValue: "moment().subtract(1, 'days')",
            showValue: moment().subtract(1, 'days').format()
          },
          {
            lable: "当前时间减一月：moment().subtract(1, 'months')",
            copyValue: "moment().subtract(1, 'months')",
            showValue: moment().subtract(1, 'months').format()
          },
          {
            lable: "当前时间减一年：moment().subtract(1, 'years')",
            copyValue: "moment().subtract(1, 'years')",
            showValue: moment().subtract(1, 'years').format()
          }
        ]
      }
    ]
    this.list.forEach((item, index) => {
      this.activeNames.push(index)
    })
  },
  methods: {
    handleChange (val) {
      // console.log(val)
    },
    copyText () {
      var clipboard = new Clipboard('.link-text')
      clipboard.on('success', (e) => {
        this.$notify.success({
          title: '复制成功'
        })
        //  释放内存
        clipboard.destroy()
      })
      clipboard.on('error', (e) => {
        // 不支持复制
        this.$notify.error({
          title: '该浏览器不支持复制'
        })
        // 释放内存
        clipboard.destroy()
      })
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
