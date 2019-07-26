<template>
  <div class="app-container">
    <aside>
      选定实行部门
      消息(收/发消息)
    </aside>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column label="日期" sortable prop="timestamp" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.propoTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提案号" sortable width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.propoId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提案者" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.propoAuthor }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提案名" width="400px">
        <template slot-scope="scope">
          <span>{{ scope.row.propoName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="120px" align="center">
        <template slot-scope="scope">
          <el-button type="info" @click="goToDetail(scope.$index, scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="选择部门办理" width="250px">
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
    <pagination v-show="total>0" class="fly" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTableData" />
  </div>
</template>

<script>
import { fetchTableData } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Assign',
  components: { Pagination },
  data() {
    return {
      tableData: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      value: '',
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
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      fetchTableData(this.listQuery).then(response => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
    },
    // 打开详情页
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.tableData[index].propoId
      this.$router.push({ path: p })
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
  /* .fly {
    position: absolute;
    left:8px;
    top:600px
  } */
</style>
