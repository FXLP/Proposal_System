<template>
  <div class="title">
    <el-button icon="el-icon-edit-outline" type="primary" @click="ToSendMessage">
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
          prop="标题"
          label="标题"
        />
        <el-table-column
          prop="状态"
          label="读取状态"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="info" @click="open(scope.$index, scope.row)">
              详情
            </el-button>
            <el-button type="danger" icon="el-icon-delete" round @click="delSingle(scope.$index, scope.row)" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button icon="el-icon-delete" class="btnDel" type="danger" round @click="AllDel">
      删除所选
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
      currentPage: 1, // 默认开始页面
      tableData: [
        {
          id: '1',
          日期: '2018-9-8',
          发件人: 'kk',
          标题: '1傻狗',
          状态: '1V1.2',
          内容: '1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗'
        },
        {
          id: '2',
          日期: '2018-8-2',
          发件人: '小哈',
          标题: '傻狗2傻狗2傻狗2傻狗',
          状态: '2V1.2',
          内容: '1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗'
        },
        {
          id: '3',
          日期: '2018-8-1',
          发件人: '小哈',
          标题: '3傻狗',
          状态: '3V1.2',
          内容: '1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗'
        },
        {
          id: '4',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: '1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗'
        },
        {
          id: '5',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: '1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗1傻狗'
        },
        {
          id: '6',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '7',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '8',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '9',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '10',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '11',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '12',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '15',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '14',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '58',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '58',
          日期: '2018-8-9',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        },
        {
          id: '25',
          日期: '2018-3-7',
          发件人: '小花',
          标题: '4傻狗',
          状态: '已读',
          内容: 'sb'
        }
      ]
    }
  },
  methods: {
    created() {
      this.total = this.tableData.length
    },
    current_change(currentPage) {
      this.currentPage = currentPage
    },
    ToSendMessage() {
      this.$router.push('/message/send')
    },
    open(index, row) {
      const p = this.tableData[index].内容
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
