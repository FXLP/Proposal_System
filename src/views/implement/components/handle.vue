<template>
  <div>
    <el-col :span="12.5" class="app-col1">
      <h3>部门承办消息</h3>
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="110"
        />
        <el-table-column
          label="提案号"
          prop="propoNumber"
          sortable
          width="90"
        />
        <el-table-column
          label="提案者"
          prop="name"
          width="100px"
        />
        <el-table-column
          prop="title"
          label="提案名"
          width="140"
        />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="goToDetail(scope.$index, scope.row)">
              详情
            </el-button>
            <el-button type="warning" size="mini" icon="el-icon-circle-plus-outline" round @click="inviteForprop(i)">
              邀请附议
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-button icon="el-icon-delete" class="btnDel" type="danger" round @click="batchDelete">
        批量删除
      </el-button> -->
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
      dialogVisible: false,
      detail_con: '',
      tableData: [
        {
          date: '2016-05-01',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '1'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分',
          propoNumber: '2'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾',
          propoNumber: '3'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃',
          propoNumber: '4'
        },
        {
          date: '2016-05-05',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要',
          propoNumber: '5'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          title: '垃圾分类',
          content: '我',
          propoNumber: '6'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '7'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '1008'
        },
        {
          date: '2016-05-09',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '1009'
        },
        {
          date: '2016-05-10',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10010'
        },
        {
          date: '2016-05-11',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10011'
        },
        {
          date: '2016-05-12',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10012'
        },
        {
          date: '2016-05-13',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10013'
        },
        {
          date: '2016-05-14',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10014'
        },
        {
          date: '2016-05-14',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10014'
        },
        {
          date: '2016-05-14',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10014'
        },
        {
          date: '2016-05-14',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10014'
        },
        {
          date: '2016-05-14',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10014'
        },
        {
          date: '2016-05-14',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类',
          propoNumber: '10014'
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
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.tableData[index].propoNumber
      this.$router.push({ path: p })
    },
    inviteForprop(i) {
      this.dialogVisible = true
      this.detail_con = this.list[i].name
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
    left:260px;
    top:600px
  }
  .app-col1 {
    margin: 0px 80px 0px 0px;
  }
  /* .btnDel {
    position:absolute;
    right:660px;
    top:600px
  } */
</style>
