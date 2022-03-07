<!--
  * @Author: wanghao
 * @Date: 2021-10-28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-03-07 17:05:18
 * @Description:
-->
<template>
  <el-block-container id="mainBox">
    <el-block>
      <el-panel title="查询条件">
        <el-form
          :model="queryParameters"
          label-position="right"
          label-width="125px"
          size="medium"
          @submit.native.prevent
        >
          <!-- collapse-btn 属性可以自动渲染 展开/收起 按钮 -->
          <el-row collapse-btn ref="queryBox">
            <el-col layout-size="large">
              <el-form-item label="起止日期">
                <el-date-picker
                  v-model="query.timeRange"
                  @change="handleQuery()"
                  :clearable="false"
                  :default-time="defaultTime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col layout-size="large">
              <el-form-item label="地区">
                <el-select
                  v-model="queryParameters.AREA_NAME"
                  @change="handleQuery()"
                  @clear="handleQuery()"
                  placeholder="请选择地区"
                  clearable
                >
                  <el-option
                    v-for="item in areaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col layout-size="large" collapse-col>
              <el-form-item label="医院编码">
                <el-input
                  v-model="queryParameters.MI_CODE"
                  placeholder="请输入医院编码"
                  @keyup.enter.native="handleQuery()"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col layout-size="large" collapse-col>
              <el-form-item label="医院名称">
                <el-input
                  v-model="queryParameters.MI_NAME"
                  placeholder="请输入医院名称"
                  @keyup.enter.native="handleQuery()"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col layout-size="large" collapse-col>
              <el-form-item label="险种" prop="INSU_TYPE">
                <el-select
                  v-model="queryParameters.INSU_TYPE"
                  type="INSU_TYPE"
                  @change="handleQuery()"
                  @clear="handleQuery()"
                  class="widthAuto"
                  clearable
                ></el-select>
              </el-form-item>
            </el-col>
            <el-col layout-size="large" collapse-col>
              <el-form-item label="上次住院费用">
                <el-row>
                  <el-col :span="11">
                    <el-form-item>
                      <el-input
                        type="number"
                        v-model="queryParameters.DEAL_AMNT_last_min"
                        :min="0"
                        :step="1"
                        @keyup.enter.native="handleQuery()"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col style="text-align: center" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item>
                      <el-input
                        type="number"
                        v-model="queryParameters.DEAL_AMNT_last_max"
                        :min="0"
                        :step="1"
                        @keyup.enter.native="handleQuery()"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <template slot="footbar">
              <el-button type="blank" @click="handleReset">重置</el-button>
              <el-button type="primary" @click="handleQuery">查询</el-button>
            </template>
          </el-row>
        </el-form>
      </el-panel>
    </el-block>
    <el-block>
      <el-panel title="查询结果">
        <el-ncp-table
          ref="Table"
          :columnDefs="tabColDefs"
          :data="tableList"
          :enableFit="true"
          :enablePagination="true"
          :paginationConfig="paginationConfig"
          :useExternalPagination="true"
          @paginationConfigChange="handleQuery"
          v-loading="tableLoading"
          v-if="mainTableHeight != ''"
          :tableHeight="mainTableHeight"
        ></el-ncp-table>
      </el-panel>
    </el-block>
  </el-block-container>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'
import moment from 'moment'

export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
  components: {},
  inject: [],
  props: {},
  data () {
    const colDefs = [
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '地区',
        prop: 'AREA_NAME',
        minWidth: '100px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '医院编号',
        prop: 'MI_CODE',
        minWidth: '125px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '医院名称',
        prop: 'MI_NAME',
        minWidth: '125px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '医院等级',
        prop: 'HOS_LEVEL_NAME',
        minWidth: '80px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '经营性质',
        prop: 'E_TYPE_NAME',
        minWidth: '80px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '医院类型',
        prop: 'SPECIAL_TYPE_NAME',
        minWidth: '80px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '出院人数',
        prop: 'HOS_CY',
        minWidth: '145px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '疑似分解住院人数',
        prop: 'IDCARD_HOS',
        minWidth: '145px'
      }
    ]
    // 所有的属性定义在 return 中
    return {
      // 所有的属性名都用小驼峰命名法
      // data 中声明的所有变量都要在页面的清屏方法中重置，并同声明时保持一致
      // 个别特殊属性可以不在清屏方法中处理
      mainTableHeight: '',
      areaList: [{ label: '北京市', value: '110000' }, { label: '重庆市', value: '500000' }],
      defaultTime: ['00:00:01', '23:59:59'],
      query: { timeRange: [] },
      queryParameters: {
        AREA_NAME: '',
        MI_CODE: '',
        MI_NAME: '',
        INSU_TYPE: '',
        DEAL_AMNT_last_min: '',
        DEAL_AMNT_last_max: ''
      },
      paginationConfig: {
        pageSize: 10,
        pageSizes: [10, 20, 30],
        pageNumber: 1,
        total: 0
      },
      tabColDefs: colDefs,
      tableList: [],
      dataTimes: [],
      tableLoading: false
    }
  },
  computed: {},
  watch: {},
  beforeDestroy () {},
  async created () {
    this.query.timeRange = [
      moment().subtract(7, 'days').valueOf(),
      moment().valueOf()
    ]
    this.handleQuery()
  },
  mounted () {
    this.$refs.queryBox.unfold()
    this.initTableHeight()
    let that = this
    // 当浏览器窗口大小改变的时候将会触发onresize事件
    window.onresize = () => {
      that.initTableHeight()
    }
  },
  methods: {
    // 自动计算table高度
    initTableHeight () {
      // tab顶部高度
      // let headerHeight = document.getElementById("mainBox").parentNode.previousSibling.clientHeight;
      // console.log(headerHeight)
      // let mainHeight = document.documentElement.clientHeight-headerHeight;
      console.log(document.getElementById('mainBox'))
      let mainHeight = document.documentElement.clientHeight
      let queryBoxHeight = document.getElementById('mainBox').childNodes[0]
        .clientHeight
      let tableTabHeight = document.getElementById('mainBox').childNodes[1]
        .childNodes[0].childNodes[0].childNodes[0].childNodes[0].clientHeight
      let tableHeight =
        mainHeight - queryBoxHeight - 10 - tableTabHeight - 10 - 10
      this.mainTableHeight = tableHeight + 'px'
    },
    handleReset () {
      // 初始化查询参数
      this.queryParameters = this.$options.data().queryParameters
      if (this.dataTimes.length > 0) {
        this.query.timeRange = [
          moment(this.dataTimes[0].INH_DATE_min).valueOf(),
          moment(this.dataTimes[0].INH_DATE_max).valueOf()
        ]
      } else {
        this.query.timeRange = [
          moment().subtract(7, 'days').valueOf(),
          moment().valueOf()
        ]
      }
      this.queryParameters.DEAL_AMNT_last_min = '20000'
      this.handleQuery()
    },
    handleQuery () {
      try {
        this.tableLoading = true
        this.tableList = [
          {
            AREA_NAME: '北京',
            MI_CODE: '1001',
            MI_NAME: '北京首都医院',
            HOS_LEVEL_NAME: '三甲',
            E_TYPE_NAME: '国营',
            SPECIAL_TYPE_NAME: '综合性医院',
            HOS_CY: '100',
            IDCARD_HOS: '1000'
          },
          {
            AREA_NAME: '北京',
            MI_CODE: '1002',
            MI_NAME: '三里屯医院',
            HOS_LEVEL_NAME: '三甲特等',
            E_TYPE_NAME: '民营',
            SPECIAL_TYPE_NAME: '综合性医院',
            HOS_CY: '1000',
            IDCARD_HOS: '10000'
          }
        ]
        this.paginationConfig.total = 2
      } catch (err) {
        this.$notify({
          title: '失败',
          message: err.message,
          type: 'warning',
          showClose: false
        })
      } finally {
        this.tableLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
