<template>
  <div>
    <el-col :span="10" class="col1">
      <h3>发送消息</h3>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收信人" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="时间" required>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="信息内容" prop="content">
          <el-input v-model="ruleForm.content" type="textarea" :rows="12" />
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

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        date: '',
        content: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入收件人', trigger: 'blur' }
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
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
          return this.$confirm(`确定发送？`)
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
    margin-right: 40px;
  }
</style>
