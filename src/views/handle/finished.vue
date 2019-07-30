<template>
  <div class="app-container">
    <el-button size="mini" type="success">已完成提案</el-button>
    <el-table :data="list" style="width: 98%">
      <el-table-column
        label="日期"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="提案名"
        width="360"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>提案发起者: {{ scope.row.name }}</p>
            <p>附议人数: {{ scope.row.proponum }}</p>
            <p>提案状态: {{ scope.row.propostate }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="primary">{{ scope.row.proponame }}</el-tag>
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
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchFinishedList } from '@/api/proposal'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CommanderReview',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      search: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchFinishedList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
    },
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.list[index].propoId
      this.$router.push({ path: p })
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.propostate = status 
      console.log(row.propostate)
    },
    handleDelete(index){
      this.list.splice(index,1)
    }
  }
}
</script>
