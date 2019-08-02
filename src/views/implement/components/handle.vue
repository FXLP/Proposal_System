<template>
  <div class="app-container">
    <h3>部门承办消息</h3>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((page-1)*limit,page*limit)"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column label="日期" sortable prop="timestamp" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.proposalFormal.proposalReviewTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案号" sortable width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.proposalFormal.putOnRecordNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案者" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.proposalFormal.proposerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提案名" width="400px">
        <template slot-scope="scope">
          <span>{{ scope.row.proposalFormal.proposalTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="查看" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="info" @click="goToDetail(scope.$index, scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="选择办理人" align="center" width="200px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.value" :disabled="scope.row.propostatus == '已办'" multiple clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="105">
        <template slot-scope="scope">
          <el-button type="primary" round :disabled="scope.row.propostatus == '已办'" @click="sure(scope.$index, scope.row)">
            确定
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
    <pagination v-show="total>0" :total="total" :page.sync="page" :limit.sync="limit" @pagination="getTableData" />
  </div>
</template>

<script>
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
      tableData: [],
      total: 50,
      page: 1,
      limit: 10,
      user: {},
      dialogVisible: false,
      detail_con: '',
      options: [
        {
          value: '选项1',
          label: 'lily'
        },
        {
          value: '选项2',
          label: 'haha'
        },
        {
          value: '选项3',
          label: 'nacy'
        },
        {
          value: '选项4',
          label: 'lucy'
        }
      ]
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.getTableData()
  },
  methods: {
    getTableData() {
      // var _this = this
      // var url = _this.serverUrl + '/proposalFormal/findProposalFormalByDepartmentId'
      // this.$http.get(url, this.$qs.stringify({ stage: '待部门分派负责人',id: '0' }) )
      //   .then(res => {
      //     console.log(res.data.data)
      //     // _this.tableData = res.data.data
      //     // _this.total = res.data.data.length
      //   })

      this.request({
        url: this.serverUrl + '/proposalFormal/findProposalFormalByDepartmentId',
        method: 'get',
        params: { stage: '待部门分派负责人', id: this.user.departmentId }
      }).then(res => {
        console.log(res.data)
        this.tableData = res.data
        this.total = res.data.length
      })
    },
    sure(index, row) {
      this.$set(this.tableData[index], 'propostatus', '已办')
    },
    // 去详情页面
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.tableData[index].proposalFormal.putOnRecordNumber
      this.$router.push({ path: p })
    }
    // // 邀请承办部门
    // inviteForJoint(index, row) {
    //   this.dialogVisible = true
    //   this.detail_con = this.tableData[index].propoId
    // }
    // // 删除单行
    // handleDelete(index) {
    //   this.tableData.splice(index, 1)
    // },
    // // 批量删除
    // batchDelete() {
    //   const multData = this.multipleSelection
    //   const tableData1 = this.tableData
    //   const multDataLen = multData.length
    //   const tableDataLen = tableData1.length
    //   for (let i = 0; i < multDataLen; i++) {
    //     for (let y = 0; y < tableDataLen; y++) {
    //       if (JSON.stringify(tableData1[y]) === JSON.stringify(multData[i])) { // 判断是否相等，相等就删除
    //         this.tableData.splice(y, 1)
    //       }
    //     }
    //   }
    // },
    // // 选中
    // handleSelectionChange(val) {
    //   this.multipleSelection = val
    // }
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
