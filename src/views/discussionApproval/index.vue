<template>
  <div class="app-container">
    <el-button size="mini" type="primary">提案组讨论审定</el-button>
    <el-table :data="list.slice((page-1)*limit,page*limit)" style="width: 98%">
      <el-table-column
        label="日期"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.proposalTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="提案名"
        width="360"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>提案发起者: {{ scope.row.proposerName }}</p>
            <p>附议人数: {{ scope.row.proposalSeconderCount }}</p>
            <p>提案状态: {{ scope.row.proposalStage }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="primary">{{ scope.row.proposalTitle }}</el-tag>
            </div>
          </el-popover>
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
            type="warning"
            @click="handleApproval(scope.$index,scope.row)"
          >审定</el-button>
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
      params: {Stage: '待提案组讨论审定'}
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
    handleApproval(index){
      this.list.splice(index, 1)
    }
  }
}
</script>
