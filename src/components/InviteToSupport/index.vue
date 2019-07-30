<template>
  <div>
    <el-form :model="form">
      <el-form-item label="代表名字:" :label-width="formLabelWidth">
        <div>
          <el-input v-model="form.id1" autocomplete="off" size="small" placeholder="代表工号1" />
          <br><br>
          <el-input v-model="form.id2" autocomplete="off" size="small" placeholder="代表工号2 选填" />
          <br><br>
          <el-input v-model="form.id3" autocomplete="off" size="small" placeholder="代表工号3 选填 (一次最多邀请三名)" />
        </div>
      </el-form-item>
      <el-form-item label="选项:" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <div class="butt-group">
        <el-button type="success" round @click="findUser()">确认邀请</el-button>
        <el-button type="info" round @click="clearall()">清空列表</el-button>
      </div>
    </el-form>

    <el-dialog title="提示" :visible.sync="DialogVisible" width="40%" top="25vh" append-to-body="true" :before-close="handleClose">
      <span>您即将要邀请 工号为：{{ form.id1 }}</span>
      <span>姓名为：{{ name1 }}  的同志为您附议！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="invite()">确 定 邀 请</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { get_uuid } from '@/utils/utils'
export default {
  name: 'Invite',
  data() {
    return {
      counter: 0,
      formLabelWidth: '80px',
      DialogVisible: false,
      form: {
        id1: '',
        id2: '',
        id3: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      name1: ''
    }
  },
  methods: {
    clearall() {
      this.form.id1 = ''
      this.form.id2 = ''
      this.form.id3 = ''
    },
    invite() {
      this.axios({
        method: 'post',
        url: this.serverUrl + '/message/createMessage',
        // 注意：post方式提交 参数这里可以写data get方式提交用params
        data: {
          id: get_uuid(),
          fromTo: '0002',
          toNumber: '0001',
          toName: 'ahkjdadjkfbsa',
          sendTime: '',
          isRead: false,
          content: 'invitaion'
        }
      }).then(res => {
        console.log(res)
        if (res.data.code !== 0) {
          this.$message.error('系统暂忙，请稍后再试')
        } else {
          this.$message({
            message: '邀请成功！',
            type: 'success'
          })
          this.$emit('transfer', false)
        }
      })
        .catch(err => {
          this.$message.error({
            message: err,
            type: 'warning'
          })
        })

      // this.axios
      //   .post(this.serverUrl + '/message/createMessage', JSON.stringify({
      //     id: '',
      //     fromTo: '0002',
      //     toNumber: '0001',
      //     toName: 'ahkjdadjkfbsa',
      //     sendTime: '',
      //     isRead: false,
      //     content: 'invitaion'
      //   }), this.headconfig)
      //   .then(res => {
      //     console.log(res)
      //     if (res.data.code !== 0) {
      //       this.$message.error('系统暂忙，请稍后再试')
      //     } else {
      //       this.$message({
      //         message: '邀请成功！',
      //         type: 'success'
      //       })
      //       this.$emit('transfer',false)
      //     }
      //   })
      //   .catch(err => {
      //     this.$message.error({
      //       message: err,
      //       type: 'warning'
      //     })
      //   })
      this.DialogVisible = false
    },
    findUser() {
      this.axios
        .get(this.serverUrl + '/user/findUser', { params: {
          id: this.form.id1
        }}, this.headconfig)
        .then(res => {
          console.log(res)
          if (res.data.code === -1) {
            this.$message.error('无此用户，请检查用户工号')
          } else if (res.data.code !== 0) {
            this.$message.error('系统暂忙，请稍后再试')
            this.$router.push('/')
          } else {
            this.name1 = res.data.data.userName
            this.DialogVisible = true
            this.$message({
              message: '查询成功！',
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
