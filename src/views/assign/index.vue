<template>
  <div class="app-container">
    <aside>
      选定实行部门
      消息(收/发消息)
    </aside>
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
        label="日期"
        prop="date"
        width="120px"
      />
      <el-table-column
        label="提案者"
        prop="name"
        width="120px"
      />
      <el-table-column
        label="提案名"
        prop="title"
        width="400px"
      />
      <el-table-column label="操作" width="120px" align="center">
        <template slot-scope="scope">
          <el-button type="info" @click="open(scope.$index, scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="选择部门办理" width="300px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="confirmText(scope.$index, scope.row)">
            确定
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
  data() {
    return {
      total: 100, // 默认数据总数
      pagesize: 8, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      value: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          title: '垃圾分类',
          content: '我要垃圾分类'
        }
      ],
      options: [
        {
          value: '选项1',
          label: '党委办公室'
        },
        {
          value: '选项2',
          label: '监察处'
        },
        {
          value: '选项3',
          label: '党委组织部'
        },
        {
          value: '选项4',
          label: '党委宣传部'
        },
        {
          value: '选项5',
          label: '党委统战部'
        },
        {
          value: '选项5',
          label: '党委统战部'
        },
        {
          value: '选项5',
          label: '党委统战部'
        },
        {
          value: '选项5',
          label: '党委统战部'
        },
        {
          value: '选项5',
          label: '党委统战部'
        }
      ]
    }
  },
  methods: {
    created() {
      this.total = this.tableData.length
    },
    // 实现分页渲染
    current_change(currentPage) {
      this.currentPage = currentPage
    },
    // 打开详情页
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
    // 确认分配部门
    confirmText(index, row) {
      this.$confirm('此操作将确认操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    }
  }
}
</script>
<style scoped>
  .fly {
    position: absolute;
    left:8px;
    top:600px
  }
</style>
