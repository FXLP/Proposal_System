<template>
  <div class="title">
    <el-button icon="el-icon-edit-outline" class="btn" type="primary" @click="ToSendMessage">
      发送消息
    </el-button>
    <div class="table">
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="selection"
          width="40"
        />s
        <el-table-column
          prop="id"
          label="序号"
          sortable
          width="180"
        />
        <el-table-column
          prop="日期"
          label="日期"
          sortable
          width="180"
        />
        <el-table-column
          prop="发件人"
          label="发件人"
        />
        <el-table-column
          prop="内容"
          label="内容"
        />
        <el-table-column
          prop="状态"
          label="读取状态"
        />
        <el-table-column label="操作">
          <el-button type="danger" icon="el-icon-delete" circle />
        </el-table-column>
      </el-table>
    </div>
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
      total: 1000, // 默认数据总数
      pagesize: 8, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      tableData: [
        {
          id: '1',
          日期: '2018-9-8',
          发件人: 'kk',
          内容: '1傻狗',
          状态: '1V1.2'
        },
        {
          id: '2',
          日期: '2018-8-2',
          发件人: '小哈',
          内容: '2傻狗',
          状态: '2V1.2'
        },
        {
          id: '3',
          日期: '2018-8-1',
          发件人: '小哈',
          内容: '3傻狗',
          状态: '3V1.2'
        },
        {
          id: '4',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '5',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '6',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '7',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '8',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '9',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '10',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '11',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '12',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '15',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '14',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '58',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '58',
          日期: '2018-8-9',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
        },
        {
          id: '25',
          日期: '2018-3-7',
          发件人: '小花',
          内容: '4傻狗',
          状态: '已读'
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
    ToSendMessage: function() {
      this.$router.push('/message/send')
    }
  }
}
</script>
<style scoped>
  .title {
    margin: 10px;
  }
  .table {
    margin-top: 10px
  }
  .fly {
    margin-top: 10px;
    float: right;
  }
</style>
