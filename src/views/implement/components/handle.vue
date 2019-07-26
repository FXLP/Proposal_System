<template>
  <div class="app-container">
    <h3>部门承办消息</h3>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column label="日期" sortable prop="timestamp" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.propoTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案号" sortable width="130px">
        <template slot-scope="scope">
          <span>{{ scope.row.propoId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案者" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.propoAuthor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案名" width="308px">
        <template slot-scope="scope">
          <span>{{ scope.row.propoName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="105">
        <template slot-scope="scope">
          <el-button type="info" @click="goToDetail(scope.$index, scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="选择办理人" align="center" width="250px">
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
      <el-table-column label="操作" align="center" width="205">
        <template slot-scope="scope">
          <el-button type="warning" icon="el-icon-circle-plus-outline" round @click="inviteForJoint(scope.$index, scope.row)">
            邀请承办部门
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="邀请承办部门"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <h4>提案号:{{ detail_con }}</h4>
      <JointDepartment />
    </el-dialog>
    <!-- <el-button icon="el-icon-delete" class="btnDel" type="danger" round @click="batchDelete">
      批量删除
    </el-button> -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getTableData" />
  </div>
</template>

<script>
import { fetchTableData } from '@/api/article'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import JointDepartment from '@/components/JointDepartment/index.vue'
export default {
  name: 'Handle',
  components: {
    Pagination,
    JointDepartment
  },
  data() {
    return {
      tableData: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogVisible: false,
      detail_con: '',
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
    // 去详情页面
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.tableData[index].propoId
      this.$router.push({ path: p })
    },
    // 邀请承办部门
    inviteForJoint(index, row) {
      this.dialogVisible = true
      this.detail_con = this.tableData[index].propoId
    },
    // 删除单行
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
    // 批量删除
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
    // 选中
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
  /* .btnDel {
    position:absolute;
    right:660px;
    top:600px
  } */
</style>
