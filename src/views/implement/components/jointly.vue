<template>
  <div class="app-container">
    <h3>部门协办消息</h3>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData.slice((page-1)*limit,page*limit)"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column label="日期" sortable prop="timestamp" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.propoTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="提案号" sortable width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.propoId }}</span>
          </template>
        </el-table-column>

        <el-table-column label="提案者" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.propoAuthor }}</span>
          </template>
        </el-table-column>

        <el-table-column label="提案名" width="400px">
          <template slot-scope="scope">
            <span>{{ scope.row.propoName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="216" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="toSuggestion(scope.$index, scope.row)">
              会签意见
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getTableData" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  name: 'Jointly',
  components: { Pagination },
  data() {
    return {
      tableData: null,
      total: 50,
      page: 1,
      limit: 5

    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      var _this = this
      this.$http.get('http://localhost:7788/api/proposalFormal/findAllByProposalReviewTime')
        .then(res => {
          console.log(res.data.data)
          _this.tableData = res.data.data
          _this.total = res.data.data.length
        })
    },
    // 会签意见
    toSuggestion(index, row) {
      const p = '/implement/suggestion/' + this.tableData[index].putOnRecordNumber
      this.$router.push({ path: p })
    }
    // // 删除单行
    // handleDelete(index) {
    //   this.tableData.splice(index, 1)
    // },
    // // 批量删除
    // batchDelete() {
    //   const multData = this.multipleSelection
    //   const tableData1 = this.tableData
    //   const multDataLen = multData.length
    //   const tableDataLen = tableData1.length
    //   for (let i = 0; i < multDataLen; i++) {
    //     for (let y = 0; y < tableDataLen; y++) {
    //       if (JSON.stringify(tableData1[y]) === JSON.stringify(multData[i])) { // 判断是否相等，相等就删除
    //         this.tableData.splice(y, 1)
    //       }
    //     }
    //   }
    // },
    // // 选中的选项
    // handleSelectionChange(val) {
    //   this.multipleSelection = val
    // }
  }
}
</script>

<style scoped>
  /* .btnDel {
    position: absolute;
    margin-top: 20px;
    margin-left: 1100px
  } */
</style>
