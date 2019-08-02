<template>
  <div class="app-container">
    <el-button size="mini" type="primary">校领导审阅</el-button>
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
            @click="handleVerify(scope.$index,scope.row)"
          >审阅</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" @pagination="getList" />
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
      total: 50,
      listLoading: true,
      page: 1,
      limit: 10,
      search: ''
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
        params: { Stage: '待部门分派负责人' }
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
    // var _this = this
    // this.$http.post('http://localhost:7788/api/proposalFormal/getAllByStage', this.$qs.stringify({stage: '待部门分派负责人'}) )
    // .then(res => {
    //   console.log(res.data)
    //   _this.list = res.data.data
    // })
    },
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.list[index].propoId
      this.$router.push({ path: p })
    },
    handleVerify(index) {
      console.log('已审阅')
      this.$message({
        message: '审阅成功',
        type: 'success'
      })
      this.list.splice(index, 1)
    }
  }
}
</script>
