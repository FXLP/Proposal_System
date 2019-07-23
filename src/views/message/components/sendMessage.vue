<template>
  <div>
    <el-col :span="14" class="col2">
      <h3>已发送的消息</h3>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="35"
        />
        <el-table-column
          prop="id"
          label="序号"
          width="60"
        />
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="143"
        />
        <el-table-column
          prop="name"
          label="接受方"
          width="160"
        />
        <el-table-column
          prop="title"
          label="标题"
          width="200"
        />
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="open(scope.$index, scope.row)">
              详情
            </el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" round @click="delSingle(scope.$index, scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-button icon="el-icon-delete" class="btnDel" type="danger" round @click="AllDel">
        删除所选
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
      pagesize: 9, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '冯伟横',
          title: 'hhhhhh,憨憨',
          content: '第1条'
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎',
          title: 'hhhhhh,憨憨',
          content: '第2条'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '冯伟狠',
          title: 'hhhhhh,憨憨',
          content: '第3条'
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        },
        {
          id: '6',
          date: '2016-05-02',
          name: '王小虎',
          title: 'hhhhhh,憨憨',
          content: '第一条'
        }
      ]
    }
  },
  methods: {
    created: function() {
      this.total = this.tableData.length
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
