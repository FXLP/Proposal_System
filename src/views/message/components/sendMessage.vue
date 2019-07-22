<template>
  <div>
    <el-col :span="13" class="col2">
      <h3>已发送的消息</h3>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="33"
        />
        <el-table-column
          prop="id"
          label="序号"
          width="90"
        />
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="130"
        />
        <el-table-column
          prop="name"
          label="接受方"
          width="130"
        />
        <el-table-column
          prop="title"
          label="内容"
          width="190"
        />
        <el-table-column label="操作" width="120" @click="deleteItem">
          <el-button type="danger" icon="el-icon-delete" circle />
        </el-table-column>
      </el-table>
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
      pagesize: 8, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '冯伟横',
          title: 'hhhhhh,憨憨'

        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '冯伟狠',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '5',
          date: '2016-05-01',
          name: '冯伟很',
          title: 'hhhhhh,憨憨'
        },
        {
          id: '6',
          date: '2016-05-02',
          name: '王小虎',
          title: 'hhhhhh,憨憨'
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
    }
  }
}
</script>

<style scoped>
  .fly {
    margin-top: 10px;
    float: right;
  }
</style>
