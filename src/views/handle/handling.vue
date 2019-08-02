<template>
  <div class="app-container">
    <el-button size="mini" type="warning">办理中提案</el-button>
    <el-table :data="list.slice((page-1)*limit,page*limit)" style="width: 98%">
      <el-table-column
        label="日期"
        width="120"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.proposalTime | parseTime('{y}-{m}-{d}')}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="序号"
        width="80"
      >
      <template slot-scope="scope">
      <span >{{ scope.row.id }}</span>
      </template>
      </el-table-column> -->
      <el-table-column
        label="提案名"
        width="360"
      >
        <template slot-scope="scope">
          <span >{{ scope.row.proposalTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="提案人"
        width="120"
      >
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>所属代表团: {{ scope.row.proposerDelegation }}</p>
          <div slot="reference" class="name-wrapper">
            <span >{{ scope.row.proposerName }}</span>
          </div>
          </el-popover>
      </template>
      </el-table-column>

     <el-table-column
        label="提案状态"
        width="180"
      >
      <template slot-scope="scope">
      <span >{{ scope.row.proposalStage }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="附议人数"
        width="180"
      >
      <template slot-scope="scope">
      <span >{{ scope.row.proposalSeconderCount }}</span>
      </template>
      </el-table-column>
      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="goToDetail(scope.$index, scope.row)"
          >详情</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleModifyStatus(scope.$index, scope.row,'已完成')"
          >完结</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="填写办理意见"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
    <el-form :model="form">
      <div>
        <el-input v-model="form.proposalHandleOpinions" autocomplete="off" size="small" placeholder="办理意见" />
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitComments()">提交意见</el-button>
      </span>
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CommanderReview',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      page: 1,
      limit: 10,
      search: '',
      form:{
        proposalHandleOpinions: ''
      },
      dialogVisible: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return this.request({
      url: this.serverUrl + '/proposalFormal/getAllByStage',
      method: 'post',
      params: {Stage: '办理中'}
     }).then(res => {
      console.log(res)
      if (res.code !== 0) {
        this.$message({
          type: 'warning',
          message: '更新列表失败'
        })
      } else {
        this.list = res.data
        this.total = res.data.length
        this.$message({
          type: 'success',
          message: '更新列表成功'
        })
      }
      })
    },
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.list[index].propoId
      this.$router.push({ path: p })
    },
    handleModifyStatus(index, row, status) {
      row.propostate = status
      console.log(row.propostate)
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitComments(){
      console.log('提交办理意见')
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    }
  }
}
</script>
