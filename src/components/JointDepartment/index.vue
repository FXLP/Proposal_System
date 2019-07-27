<template>
  <div>
    <el-form :model="form">
      <el-form-item label="选项:" :label-width="formLabelWidth" require="true">
        <el-select v-model="form.region1" multiple placeholder="请选择承办部门" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="butt-group">
        <el-button type="success" round @click="sureInvite">确认邀请</el-button>
        <el-button type="info" round @click="clearall">清空列表</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Invite',
  data() {
    return {
      counter: 0,
      formLabelWidth: '80px',
      form: {
        region1: '',
        region2: '',
        region3: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    clearall() {
      this.form.region1 = ''
      this.form.region2 = ''
      this.form.region3 = ''
    },
    sureInvite() {
      const p = '确认邀请'
      this.$alert(p, '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    }
  }
}
</script>
