<template>
  <div>
    <el-col :span="13" class="col2">
      <h3>已发送的消息</h3>
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="42"
        />

        <el-table-column label="日期" sortable prop="timestamp" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.sendTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="接受者" prop="timestamp" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.toName }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="消息内容" prop="timestamp" width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column> -->

        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="info" @click="open(scope.$index, scope.row)">
              详情
            </el-button>
            <el-button type="danger" icon="el-icon-delete" round @click="handleDelete(scope.$index, scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-button icon="el-icon-delete" class="btnDel" type="danger" round @click="batchDelete">
        批量删除
      </el-button>
      <el-pagination
        class="fly"
        layout="prev, pager, next"
        background
        hide-on-single-page
        :total="total"
        @current-change="current_change"
      />
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 100, // 默认数据总数
      user: {},
      pagesize: 9, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      tableData: []
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.getTableData()
  },
  methods: {
    getTableData() {
      // var _this = this
      // var number = localStorage.getItem('user_Id')
      // var url = _this.serverUrl + '/message/getMessageListByToNumber'
      // this.$http.get(url, this.$qs.stringify({ toNumber: 'number'}))
      //   .then(res => {
      //     console.log(res)
      //     // _this.tableData = res.data.data
      //     // _this.total = res.data.data.length
      //   })
      this.request({
        url: this.serverUrl + '/message/getMessageListByFromTo',
        methods: 'get',
        params: { fromTo: this.user.id }
      }).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.data.length
      })
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage
    },
    open(index, row) {
      const p = this.tableData[index].content
      this.$alert(p, '消息的具体内容', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    },
    // 删除单行
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
    batchDelete() {
      const multData = this.multipleSelection
      const tableData1 = this.tableData
      const multDataLen = multData.length
      const tableDataLen = tableData1.length
      for (let i = 0; i < multDataLen; i++) {
        for (let y = 0; y < tableDataLen; y++) {
          if (JSON.stringify(tableData1[y]) === JSON.stringify(multData[i])) { // 判断是否相等，相等就删除
            this.tableData.splice(y, 1)
          }
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
  .fly {
    position:absolute;
    right:20px;
    top:600px
  }
  .btnDel {
    position:absolute;
    right:660px;
    top:600px
  }
</style>
