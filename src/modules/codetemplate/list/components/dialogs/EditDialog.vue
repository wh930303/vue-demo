<template>
  <el-dialog
      :title="title"
      :visible.sync="editDialogVisible"
      width="80%"
      :close-on-click-modal="false"
      class="hsa-dialog"
      @open="initDialog"
      :before-close="onClose"
    >
      <el-form
        :model="diseListBFormEdit"
        label-position="right"
        label-width="120px"
        size="medium"
        :rules="diseListBEditFormRules"
        ref="diseListBEditForm"
        @submit.native.prevent
      >
        <hsa-row>
          <hsa-col :sm="24" :md="12" :lg="8">
            <el-form-item label="疾病编码" prop="diseCode">
              <el-input
                v-model="diseListBFormEdit.diseCode"
                placeholder="请输入疾病编码"
                maxlength="100"
                :disabled="diseListBFormEditDisabled"
              ></el-input>
            </el-form-item>
          </hsa-col>
          <hsa-col :sm="24" :md="12" :lg="8">
            <el-form-item label="疾病名称" prop="diseName">
              <el-input
                v-model="diseListBFormEdit.diseName"
                placeholder="请输入疾病名称"
                maxlength="50"
                :disabled="diseListBFormEditDisabled"
              ></el-input>
            </el-form-item>
          </hsa-col>
          <hsa-col :sm="24" :md="12" :lg="8">
            <el-form-item label="中西医疾病类型" prop="icmDiseType">
              <el-select
                v-model="diseListBFormEdit.icmDiseType"
                type="ICM_DISE_TYPE"
                class="widthAuto"
              ></el-select>
            </el-form-item>
          </hsa-col>
        </hsa-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onClose" size="medium">取 消</el-button>
        <el-button
          type="primary"
          @click="diseListBEditConfirm"
          size="medium"
          :loading="buttonLoading"
          :disabled="buttonLoading"
          >保 存</el-button
        >
      </div>
    </el-dialog>
</template>

<script>
// 如果采用架构提供的自适应布局框架，则必需引入 coreMixin
import layoutMixin from '@ncp-web/hsa-ui/lib/mixins/adaptive-layout-mixin'
// 导入对应的 service，service 命名采用小驼峰，同文件名保持一直
import Service from '@/modules/codetemplate/list/index.service.js'
import DiseListBClass from '@/modules/codetemplate/list/class/dise-list-b-mngr.class'
import moment from 'moment'
export default {
  // 如果采用架构提供的自适应布局框架，则必需 mixin coreMixin
  mixins: [layoutMixin],
  name: 'EditDialog',
  props: {
    editDialogVisible: {
      type: Boolean,
      default () {
        return false
      }
    },
    rowData: Object,
    title: String,
    operateType: String
  },
  // 初始化页面数据在 created 生命周期钩子中进行
  created () {},
  // 通过 $refs 对页面进行初始化的操作一律在 mounted 生命周期钩子中进行
  mounted () {},
  computed: {},
  methods: {
    initDialog () {
      this.diseListBFormEdit = this.rowData
      this.$nextTick(() => {
        this.$refs.diseListBEditForm.clearValidate()
      })
    },
    async addDiseListB () {
      try {
        this.dialogLoading = true
        this.buttonLoading = true
        await Service.resources.post(this.diseListBFormEdit)
        this.$message.info('新增成功！')
        this.$emit('ok')
      } catch (err) {
        let errStr = err.message
        this.$message.error('新增失败！' + errStr)
      } finally {
        this.dialogLoading = false
        this.buttonLoading = false
      }
    },
    async updateDiseListB () {
      try {
        this.dialogLoading = true
        this.buttonLoading = true
        await Service.resources.put(this.diseListBFormEdit)
        this.$message.info('更新成功！')
        this.$emit('ok')
      } catch (err) {
        let errStr = err.message
        this.$message.error('更新失败！' + errStr)
      } finally {
        this.dialogLoading = false
        this.buttonLoading = false
      }
    },
    resetDiseListBEditForm () {
      this.$refs.diseListBEditForm.resetFields()
    },
    onClose () {
      this.resetDiseListBEditForm()
      this.$emit('close')
    },
    diseListBEditConfirm () {
      this.setDiseListB()
      this.$refs.diseListBEditForm.validate((valid) => {
        if (valid) {
          if (this.operateType === 'update') {
            this.updateDiseListB()
          } else {
            this.addDiseListB()
          }
        } else {
          return false
        }
      })
    },
    setDiseListB () {
      this.diseListBFormEdit.begntime = moment().valueOf()
      this.diseListBFormEdit.endtime = moment().add(1, 'year').valueOf()
      this.diseListBFormEdit.valiFlag = '1'
      this.diseListBFormEdit.pinyin = 'ceshi'
      this.diseListBFormEdit.wubi = 'ceshii'
      this.diseListBFormEdit.engName = 'ceshi'
      this.diseListBFormEdit.crter = '1'
      this.diseListBFormEdit.crterName = '测试用户1'
      this.diseListBFormEdit.crteTime = moment().valueOf()
      this.diseListBFormEdit.crteOptins = '1001'
      this.diseListBFormEdit.opter = '1'
      this.diseListBFormEdit.opterName = '测试用户1'
      this.diseListBFormEdit.optTime = moment().valueOf()
      this.diseListBFormEdit.optins = '1001'
      this.diseListBFormEdit.ver = '1'
    }
  },
  data () {
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
      ]
    }
    // 所有的属性定义在 return 中
    return {
      // 所有的属性名都用小驼峰命名法
      // data 中声明的所有变量都要在页面的清屏方法中重置，并同声明时保持一致
      // 个别特殊属性可以不在清屏方法中处理
      dialogLoading: false,
      buttonLoading: false,
      diseListBFormEditDisabled: false,
      diseListBFormEdit: new DiseListBClass(),
      diseListBEditFormRules: diseListBRules
    }
  }
}
</script>

<style lang="scss" scoped></style>
