<template>
  <el-form :model="form">
    <el-form-item label="代表名字:" :label-width="formLabelWidth">
      <div>
        <el-input v-model="form.name1" autocomplete="off" size="small" placeholder="姓名1" />
        <br><br>
        <el-input v-model="form.name2" autocomplete="off" size="small" placeholder="姓名2 选填" />
        <br><br>
        <el-input v-model="form.name3" autocomplete="off" size="small" placeholder="姓名3 选填 (一次最多邀请三名)" />
      </div>
    </el-form-item>
    <el-form-item label="选项:" :label-width="formLabelWidth">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item>
    <div class="butt-group">
      <el-button type="success" round @click="invite()">确认邀请</el-button>
      <el-button type="info" round @click="clearall()">清空列表</el-button>
    </div>
  </el-form>
</template>

<script>

export default {
  name: 'Invite',
  data() {
    return {
      counter: 0,
      formLabelWidth: '80px',
      form: {
        name1: '',
        name2: '',
        name3: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    clearall() {
      this.form.name1 = ''
      this.form.name2 = ''
      this.form.name3 = ''
    },
    invite() {
      const data = {
        name1: this.form.name1,
        name2: this.form.name2,
        name3: this.form.name3
      }
      this.axios
        .post(this.serverUrl + '/inviteForSpport', this.qs.stringify(data), this.headconfig)
        .then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.$message.error('系统暂忙，请稍后再试')
            this.$router.push('/')
          } else {
            this.$message({
              message: '邀请成功！',
              type: 'success'
            })
          }
        })
        .catch(err => {
          this.$message.error({
            message: err,
            type: 'warning'
          })
        })
    }
  }
}

</script>
<style>
 .butt-group{
    margin-left:30%;
  }
</style>
