<template>
  <div class="app-container">
    <aside>
      选定实行部门
      消息(收/发消息)
    </aside>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((page-1)*limit,page*limit)"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column label="日期" sortable prop="timestamp" width="140px">
        <template slot-scope="scope">
          <span>{{ scope.row.proposalTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提案号" sortable width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.putOnRecordNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提案者" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.proposalHandlerName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="提案名" width="280px">
        <template slot-scope="scope">
          <span>{{ scope.row.proposalTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column label="查看" width="100px" align="center">
        <template slot-scope="scope">
          <el-button type="info" @click="goToDetail(scope.$index, scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="选择承办部门" width="200px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.label" :disabled="scope.row.propostatus == '已办'" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="选择协办部门" width="200px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.value" multiple :disabled="scope.row.propostatus == '已办'" clearable placeholder="请选择">
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
          <el-button type="primary" :disabled="scope.row.propostatus == '已办'" @click="confirmText(scope.$index, scope.row, scope.row.propostatus)">
            确定
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="选择领导"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <JointDepartment :table-data="tableData" :detail_con1="detail_con" />
    </el-dialog>

    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getTableData" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import JointDepartment from '@/components/JointDepartment/index.vue'

export default {
  name: 'Assign',
  components: { Pagination, JointDepartment },
  data() {
    return {
      dialogVisible: false,
      confirmDialog: false,
      detail_con: '',
      tableData: null,
      total: 50,
      page: 1,
      limit: 5,

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
          value: '选项6',
          label: '党委统战部'
        },
        {
          value: '选项7',
          label: '党委统战部'
        },
        {
          value: '选项8',
          label: '党委统战部'
        },
        {
          value: '选项9',
          label: '党委统战部'
        },
        {
          value: '选项10',
          label: '党委统战部'
        }
      ]
    }
  },
  created() {
    this.getTableData()
  },
  mounted() {

  },
  methods: {
    getTableData() {
      var _this = this
      this.axios.get('http://localhost:7788/api/proposalFormal/findAllByProposalReviewTime')
        .then(res => {
          console.log(res.data.data)
          _this.tableData = res.data.data
        })
    },
    // 打开详情页
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.tableData[index].propoId
      this.$router.push({ path: p })
    },
    // 确认分配部门
    confirmText(index, row) {
      this.dialogVisible = true
      this.detail_con = this.tableData[index].propoId
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
