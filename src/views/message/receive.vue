<template>
  <div class="title">
    <el-button icon="el-icon-edit-outline" type="primary" @click="ToSendMessage">
      发送消息
    </el-button>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        stripe
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="45"
        />
        <el-table-column label="日期" sortable width="180px">
          <template slot-scope="scope">
            <span>{{ scope.row.sendTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="发送者" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.fromTo }}</span>
          </template>
        </el-table-column>

        <el-table-column label="消息内容" width="650px">
          <template slot-scope="scope">
            <span>{{ scope.row.content }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.read }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" round @click="handleDelete(scope.$index, scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button icon="el-icon-delete" class="btnDel" type="danger" round @click="batchDelete">
      批量删除
    </el-button>
    <el-pagination
      class="fly"
      layout="prev, pager, next"
      background
      :total="total"
      @current-change="current_change"
    />
  </div>
</template>

<script>
export default {
  name: 'Receive',
  data() {
    return {
      total: 100, // 默认数据总数
      pagesize: 8, // 每页的数据条数
      user: {},
      currentPage: 1, // 默认开始页面
      multipleSelection: [],
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
        url: this.serverUrl + '/message/getMessageListByToNumber',
        method: 'get',
        params: { toNumber: this.user.id }
      }).then(res => {
        // console.log(res)
        this.tableData = res.data
        this.total = res.data.length
      })
    },
    // 实现分页渲染
    current_change(currentPage) {
      this.currentPage = currentPage
    },
    // 跳转到发送消息页面
    ToSendMessage() {
      this.$router.push('/message/send')
    },
    // 删除单行
    handleDelete(index) {
      // var _this = this
      // 后台用@RequestParam接收，所以先转换为param
      const param = new URLSearchParams()
      param.append('id', this.tableData[index].id)
      var url = this.serverUrl + '/message/deleteMessage'
      this.$http.post(url, param)
        .then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
    },
    // 批量删除
    batchDelete() {
      // var _this = this
      const multData = this.multipleSelection
      const tableData1 = this.tableData
      const multDataLen = multData.length
      const tableDataLen = tableData1.length
      for (let i = 0; i < multDataLen; i++) {
        for (let y = 0; y < tableDataLen; y++) {
          if (JSON.stringify(tableData1[y]) === JSON.stringify(multData[i])) { // 判断是否相等，相等就删除
            this.handleDelete(i)
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
  .title {
    margin: 15px;
  }
  .table {
    margin-top: 20px
  }
  .fly {
    position: absolute;
    left:8px;
    top:600px
  }
  .btnDel {
    position:absolute;
    right:120px;
    top:600px
  }

  </style>
