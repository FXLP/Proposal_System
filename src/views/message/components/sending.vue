<template>
  <div>
    <el-col :span="9" class="col1">
      <h3>发送消息</h3>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收信人" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="信息内容" prop="content">
          <el-input v-model="ruleForm.content" type="textarea" :rows="14" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import { get_uuid } from '@/utils/utils'
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入收信人', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写信息内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.request({
            url: this.serverUrl + '/message/createMessage',
            method: 'post',
            params: { id: get_uuid(), from_to: this.user.id, content: this.ruleForm.content, to_name: this.ruleForm.name }
          }).then(res => {
            // console.log(res)
            // this.tableData = res.data
            // this.total = res.data.length
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
  .col1 {
    margin-right: 50px;
  }
</style>
