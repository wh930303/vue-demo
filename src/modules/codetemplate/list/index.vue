<template>
  <hsa-adaptive-container>
    <hsa-adaptive-pane>
      <hsa-title-pane :value="['queryForm']">
        <hsa-title-pane-item title="查询条件" name="queryForm">
          <el-form
            :model="diseListBFormQuery"
            label-position="right"
            label-width="120px"
            size="medium"
            @submit.native.prevent
          >
            <hsa-row>
              <hsa-col :sm="12" :md="8" :lg="6">
                <el-form-item label="疾病编码">
                  <el-input
                    v-model="diseListBFormQuery.diseCode"
                    placeholder="请输入疾病编码"
                    maxlength="100"
                    @keyup.enter.native="handleQuery"
                  ></el-input>
                </el-form-item>
              </hsa-col>
              <hsa-col :sm="12" :md="8" :lg="6">
                <el-form-item label="疾病名称">
                  <el-input
                    v-model="diseListBFormQuery.diseName"
                    placeholder="请输入疾病名称"
                    maxlength="50"
                    @keyup.enter.native="handleQuery"
                  ></el-input>
                </el-form-item>
              </hsa-col>
              <hsa-col :sm="12" :md="8" :lg="6">
                <el-form-item label="中西医疾病类型">
                  <el-select
                    v-model="diseListBFormQuery.icmDiseType"
                    type="ICM_DISE_TYPE"
                    class="widthAuto"
                    @change="handleQuery"
                    @clear="handleQuery"
                    placeholder="请选择中西医疾病类型"
                    clearable
                  ></el-select>
                </el-form-item>
              </hsa-col>
              <hsa-col :sm="12" :md="8" :lg="6">
                <el-form-item label="有效标志">
                  <el-select
                    v-model="diseListBFormQuery.valiFlag"
                    type="VALI_FLAG"
                    class="widthAuto"
                    @change="handleQuery"
                    @clear="handleQuery"
                    placeholder="请选择有效标志"
                    clearable
                  ></el-select>
                </el-form-item>
              </hsa-col>
              <!-- 通过 slot="footbar" 在查询区末尾添加查询操作按钮，按钮规定使用 medium 大小 -->
              <template slot="footbar">
                <el-button size="medium" @click="clear">重置</el-button>
                <el-button type="primary" size="medium" @click="handleQuery"
                  >查询</el-button
                >
              </template>
            </hsa-row>
          </el-form>
        </hsa-title-pane-item>
      </hsa-title-pane>
    </hsa-adaptive-pane>
    <hsa-adaptive-pane :autoHeight="true">
      <hsa-title-pane :value="['queryResult']">
        <hsa-title-pane-item title="查询结果" name="queryResult">
          <!-- 通过 slot="toolbar" 在查询结果区顶部添加操作按钮 -->
          <template slot="toolbar">
            <el-button size="medium" type="success" @click="showAddDialog"
              >增加
            </el-button>
          </template>

          <ncp-table
            :columnDefs="diseListBTabColDefs"
            :data="diseListBList"
            :enablePagination="true"
            :paginationConfig="paginationConfig"
            :useExternalPagination="true"
            @paginationConfigChange="handleQuery"
            v-loading="tableLoading"
            :tableHeight="tableMaxHeight"
          ></ncp-table>
        </hsa-title-pane-item>
      </hsa-title-pane>
    </hsa-adaptive-pane>
    <EditDialog
      :editDialogVisible="editDialogVisible"
      :rowData="diseListBFormEdit"
      :title="dialogTitle"
      :operateType="operateType"
      @ok="dialogOk"
      @close="editDialogVisible = false"
    >
    </EditDialog>
  </hsa-adaptive-container>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'
import { codeFilter, tableDataFilter } from '@/common/filters/index'
// 导入对应的 service，service 命名采用小驼峰，同文件名保持一直
import Service from './index.service'
// class
import DiseListBClass from '@/modules/codetemplate/list/class/dise-list-b-mngr.class.js'
import DiseListBQueryClass from '@/modules/codetemplate/list/class/dise-list-b-mngr-query.class'
// components
import EditDialog from '@/modules/codetemplate/list/components/dialogs/EditDialog.vue'
export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
  components: { EditDialog },
  // 初始化页面数据在 created 生命周期钩子中进行
  created () {
    this.handleQuery()
  },
  // 通过 $refs 对页面进行初始化的操作一律在 mounted 生命周期钩子中进行
  mounted () {},
  computed: {},
  methods: {
    clear () {
      this.diseListBFormQuery = new DiseListBQueryClass()
      this.diseListBFormEdit = new DiseListBClass()
      this.paginationConfig = {
        pageSize: 10,
        pageNumber: 1,
        total: 0
      }
      this.diseListBList = []
      this.tableLoading = false
      this.editDialogVisible = false
      this.dialogLoading = false
      this.diseListBFormDisabled = false
      this.diseListBFormEditDisabled = false
    },
    // 异步调用，一律采用 async/await 语法
    async handleQuery () {
      try {
        this.tableLoading = true
        const diseListBResult = await Service.resources.getByPage(
          this.diseListBFormQuery,
          this.paginationConfig
        )
        if (diseListBResult.result.length === '0') {
          this.$message.info('没有查询到数据！')
          this.diseListBList = []
        } else {
          this.diseListBList = diseListBResult.result
          this.paginationConfig.pageNumber = diseListBResult.pageNumber
          this.paginationConfig.pageSize = diseListBResult.pageSize
          this.paginationConfig.total = diseListBResult.total
        }
      } catch (err) {
        let errStr = err.message
        this.$message.error('查询失败！' + errStr)
      } finally {
        this.tableLoading = false
      }
    },
    dialogOk () {
      this.editDialogVisible = false
      this.handleQuery()
    },
    async deleteDiseListB (id) {
      try {
        this.tableLoading = true
        await Service.resources.delete(id)
        this.$message.info('删除成功！')
        this.handleQuery()
      } catch (err) {
        let errStr = err.message
        this.$message.error('删除失败！' + errStr)
      } finally {
        this.tableLoading = false
      }
    },
    showAddDialog () {
      this.diseListBFormEdit = new DiseListBClass()
      this.operateType = 'add'
      this.dialogTitle = '新增'
      this.editDialogVisible = true
    },
    showEditDialog (row) {
      this.diseListBFormEdit = Object.assign({}, row)
      this.operateType = 'update'
      this.dialogTitle = '修改'
      this.editDialogVisible = true
    },
    deleteRow (row) {
      this.$confirm('是否刪除?', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'info'
      }).then(() => {
        this.deleteDiseListB(row.diseListId)
      })
    }
  },
  data () {
    const diseListBColDefs = [
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '疾病编码',
        prop: 'diseCode',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '疾病名称',
        prop: 'diseName',
        width: '120px'
      },
      {
        align: 'center',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '中西医疾病类型',
        prop: 'icmDiseType',
        width: '120px',
        filters: [
          {
            filter: (cellValue) => {
              return codeFilter(cellValue, 'ICM_DISE_TYPE')
            }
          }
        ]
      },
      {
        align: 'center',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '开始时间',
        prop: 'begntime',
        filters: [{ filter: tableDataFilter, params: ['yyyy年mm月dd日'] }],
        width: '120px'
      },
      {
        align: 'center',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '结束时间',
        prop: 'endtime',
        filters: [{ filter: tableDataFilter, params: ['yyyy年mm月dd日'] }],
        width: '120px'
      },
      {
        align: 'center',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '有效标志',
        prop: 'valiFlag',
        width: '120px',
        filters: [
          {
            filter: (cellValue) => {
              return codeFilter(cellValue, 'VALI_FLAG')
            }
          }
        ]
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '拼音助记码',
        prop: 'pinyin',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '五笔助记码',
        prop: 'wubi',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '英文名称',
        prop: 'engName',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '备注',
        prop: 'memo',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '唯一记录号',
        prop: 'rid',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '创建人',
        prop: 'crter',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '创建人姓名',
        prop: 'crterName',
        width: '120px'
      },
      {
        align: 'center',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '创建时间',
        prop: 'crteTime',
        filters: [{ filter: tableDataFilter, params: ['yyyy年mm月dd日'] }],
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '创建经办机构',
        prop: 'crteOptins',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '经办人',
        prop: 'opter',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '经办人姓名',
        prop: 'opterName',
        width: '120px'
      },
      {
        align: 'center',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '经办时间',
        prop: 'optTime',
        filters: [{ filter: tableDataFilter, params: ['yyyy年mm月dd日'] }],
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '经办机构',
        prop: 'optins',
        width: '120px'
      },
      {
        align: 'left',
        showOverflowTooltip: true,
        headerAlign: 'center',
        label: '版本号',
        prop: 'ver',
        width: '120px'
      },
      {
        label: '操作',
        type: 'Button',
        buttonGroup: [
          {
            type: 'primary',
            icon: 'el-icon-edit',
            size: 'mini',
            handle: (row) => this.showEditDialog(row)
          },
          {
            type: 'danger',
            icon: 'el-icon-delete',
            size: 'mini',
            handle: (row) => this.deleteRow(row)
          }
        ],
        width: '150px',
        fixed: 'right'
      }
    ]
    const diseListBRules = {
      diseCode: [
        { required: true, message: '请填写疾病编码', trigger: 'blur' },
        { max: 100, message: '长度不能超过 100 个字符', trigger: 'blur' }
      ],
      diseName: [
        { required: true, message: '请填写疾病名称', trigger: 'blur' },
        { max: 50, message: '长度不能超过 50 个字符', trigger: 'blur' }
      ],
      icmDiseType: [
        { required: true, message: '请选择中西医疾病类型', trigger: 'change' }
      ],
      begntime: [
        {
          required: true,
          type: 'date',
          message: '请选择开始时间',
          trigger: 'change'
        }
      ],
      endtime: [
        {
          required: true,
          type: 'date',
          message: '请选择结束时间',
          trigger: 'change'
        }
      ],
      valiFlag: [
        { required: true, message: '请选择有效标志', trigger: 'change' }
      ],
      pinyin: [
        { required: true, message: '请填写拼音助记码', trigger: 'blur' },
        { max: 30, message: '长度不能超过 30 个字符', trigger: 'blur' }
      ],
      wubi: [
        { required: true, message: '请填写五笔助记码', trigger: 'blur' },
        { max: 30, message: '长度不能超过 30 个字符', trigger: 'blur' }
      ],
      engName: [
        { required: true, message: '请填写英文名称', trigger: 'blur' },
        { max: 100, message: '长度不能超过 100 个字符', trigger: 'blur' }
      ],
      memo: [
        { required: true, message: '请填写备注', trigger: 'blur' },
        { max: 500, message: '长度不能超过 500 个字符', trigger: 'blur' }
      ],
      rid: [
        { required: true, message: '请填写唯一记录号', trigger: 'blur' },
        { max: 40, message: '长度不能超过 40 个字符', trigger: 'blur' }
      ],
      crter: [
        { required: true, message: '请填写创建人', trigger: 'blur' },
        { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
      ],
      crterName: [
        { required: true, message: '请填写创建人姓名', trigger: 'blur' },
        { max: 50, message: '长度不能超过 50 个字符', trigger: 'blur' }
      ],
      crteTime: [
        {
          required: true,
          type: 'date',
          message: '请选择创建时间',
          trigger: 'change'
        }
      ],
      crteOptins: [
        { required: true, message: '请填写创建经办机构', trigger: 'blur' },
        { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
      ],
      opter: [
        { required: true, message: '请填写经办人', trigger: 'blur' },
        { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
      ],
      opterName: [
        { required: true, message: '请填写经办人姓名', trigger: 'blur' },
        { max: 50, message: '长度不能超过 50 个字符', trigger: 'blur' }
      ],
      optTime: [
        {
          required: true,
          type: 'date',
          message: '请选择经办时间',
          trigger: 'change'
        }
      ],
      optins: [
        { required: true, message: '请填写经办机构', trigger: 'blur' },
        { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
      ],
      ver: [
        { required: true, message: '请填写版本号', trigger: 'blur' },
        { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
      ]
    }

    // 所有的属性定义在 return 中
    return {
      // 所有的属性名都用小驼峰命名法
      // data 中声明的所有变量都要在页面的清屏方法中重置，并同声明时保持一致
      // 个别特殊属性可以不在清屏方法中处理
      paginationConfig: {
        pageSize: 10,
        pageNumber: 1,
        total: 0
      },
      diseListBTabColDefs: diseListBColDefs,
      diseListBList: [],
      tableLoading: false,
      dialogLoading: false,
      buttonLoading: false,
      editDialogVisible: false,
      diseListBFormDisabled: false,
      diseListBFormEditDisabled: false,
      diseListBFormQuery: new DiseListBQueryClass(),
      diseListBFormEdit: new DiseListBClass(),
      diseListBEditFormRules: diseListBRules,
      dialogTitle: '',
      operateType: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
