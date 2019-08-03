<template>
  <div class="app-container">
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
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ProposalDraftList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      page: 1,
      limit: 10,
      user: {}
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
    this.getList()
  },
  methods: {
    getList() {
      return this.request({
      url: this.serverUrl + '/proposalDraft/getProposalDraftListByNumberAndStage',
      method: 'post',
      params: { proposerNumber: this.user.id, stage: '草稿' }
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
    handleEdit(){
      console.log('edit draft')
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
