<template>
  <div class="app-container">
    <el-row>
      <el-tabs>

        <el-tab-pane label="我提出的提案">
          <el-row :gutter="20">
            <el-col v-for="(item,i) in mylist" :key="item" :span="6">
              <div class="grid-content">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标题:{{ item.proposalTitle }}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="jumpToDetail(item.id, item.proposalSeconder?true:false)">详情</el-button>
                  </div>
                  <div class="text item">
                    <span>提案进度:{{ item.proposalStage }}</span>
                    <br>
                    <br>
                    <span v-if="!item.proposalSeconder">创建时间:{{ item.createTime | compFilter }}</span>
                    <span v-if="item.proposalSeconder">创建时间:{{ item.proposalTime | compFilter }}</span>
                    <br>
                    <br>
                    <el-button type="warning" icon="el-icon-circle-plus-outline" round @click="inviteForprop(i)">邀请附议
                    </el-button>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-dialog
            title="邀请代表附议"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
          >
            <h4>提案名称:{{ detail_con }}</h4>
            <br>
            <br>
            <invite-component @transfer="getState" />
          </el-dialog>

        </el-tab-pane>
        <el-tab-pane label="待附议的提案">

          <el-table
            :data="notPassedList"
            style="width: 100%"
            max-height="1600"
            :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="id"
              label="提案编号"
            />
            <el-table-column
              prop="proposalTitle"
              label="提案名"
            />
            <el-table-column
              prop="proposalReason"
              label="提案原因"
            />
            <el-table-column
              prop="proposalType"
              label="提案类型"
            />
            <el-table-column
              prop="proposerName"
              label="发起人"
            />
            <el-table-column
              prop="proposerDelegation"
              label="发起人所属代表团"
            />
            <el-table-column
              prop="proposerNumber"
              label="发起人联系方式"
            />
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="goToDetail(scope.$index, scope.row)"
                >详情</el-button>
                <el-button
                  v-if="!notPassedList[scope.$index].checked"
                  size="mini"
                  type="danger"
                  @click="supportProp(scope.$index, scope.row)"
                >附议</el-button>
                <el-button
                  v-if="notPassedList[scope.$index].checked"
                  disabled="true"
                  size="mini"
                  type="info"
                >已附议</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="确认附议"
            :visible.sync="confirmDialog"
            width="30%"
            :before-close="handleClose"
          >
            <span>您确定要附议该提案吗，提交不可修改！</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="confirmDialog = false">取 消</el-button>
              <el-button type="primary" @click="supportProposal(notPassedList[tableIndex].id,notPassedList[tableIndex].proposerNumber,tableIndex)">确 定</el-button>
            </span>
          </el-dialog>

        </el-tab-pane>
        <el-tab-pane label="我附议过的提案">
          <div class="supportBox">
            <el-table
              :data="mySupportList"
              style="width: 100%"
              max-height="1250"
            >
              <el-table-column
                prop="id"
                label="提案id"
                width="150"
              />
              <el-table-column
                prop="proposalTitle"
                label="提案名称"
              />
              <el-table-column
                prop="proposalReason"
                label="提案事由"
              />
              <el-table-column
                prop="proposerName"
                label="提案人姓名"
              />
              <el-table-column
                prop="proposalType"
                label="提案类型"
              />
              <el-table-column
                prop="proposerDelegation"
                label="提案人所属代表团"
              />
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope1">
                  <el-button
                    type="text"
                    size="small"
                    disabled="disable"
                    @click.native.prevent="deleteRow(scope1.$index, tableData)"
                  >
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </el-tab-pane>
      </el-tabs>

    </el-row>
    <el-row class="support-footer" />

  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import InviteComponent from '../../components/InviteToSupport/index.vue'
import { get_uuid } from '@/utils/utils'
export default {
  name: 'SupportProposal',
  components: {
    InviteComponent
  },
  filters: {
    compFilter: function(value) {
      if (value && value.length > 10) { value = value.substr(0, 10) }
      return value
    }
  },
  data() {
    return {
      driver: null,
      mylist: [],
      notPassedList: [],
      mySupportList: [],
      user: {},
      formLabelWidth: '80px',
      dialogVisible: false,
      confirmDialog: false,
      detail_con: '',
      tableIndex: ''
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log('uuuu:' + this.user.id)
    if (this.user.id === null) {
      this.$message({
        message: '登陆过期，请您重新登陆',
        type: 'warning'
      })
    } else {
      return this.request({
        url: this.serverUrl + '/proposalDraft/getProposalDraftListByNumber',
        methods: 'get',
        params: {
          proposerNumber: this.user.id
        }
      }).then((res) => {
        if (res.code !== 0) {
          this.$message({
            message: '未查询到有您发起的提案',
            type: 'warning'
          })
        } else {
          this.mylist = res.data
        }
      })
        .then(() => {
          return this.request({
            url: this.serverUrl + '/proposalFormal/getProposalFormalListByNumber',
            methods: 'get',
            params: {
              proposerNumber: this.user.id
            }
          }).then((res) => {
            if (res.code === 0) {
              this.mylist = [...this.mylist, ...res.data]
            }
          })
        })
        .then(() => {
          return this.getNpassedList().then((res) => {
            this.notPassedList = res.proposalDraftQueryArrayList
            for (var i = 0; i < this.notPassedList.length; i++) {
              this.notPassedList[i].checked = false
            }
            if (res.code === 0) {
              this.$message({
                message: 'All list get',
                type: 'success'
              })
            }
          })
        })
        .then(() => {
          return this.getSupportList().then((res) => {
            if (res.code === 0) {
              this.mySupportList = res.proposalDraftQueryArrayList
            }
          })
        })
        .catch((err) => {
          this.$message.error(err)
        })
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else if (rowIndex % 2 === 1) {
        return ''
      }
      return ''
    },
    inviteForprop(i) {
      this.dialogVisible = true
      this.detail_con = this.mylist[i].proposalTitle
    },
    supportProp(index, row) {
      this.tableIndex = index
      this.confirmDialog = true
    },
    jumpToDetail(id, formal) {
      const p = '/proposal/propodetail/' + id
      this.$router.push({ path: p, query: { 'isFormal': formal }})
    },
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.notPassedList[index].id
      this.$router.push({ path: p, query: { 'isFormal': false }})
    },
    getState(msg) {
      // console.log('msg: ${ msg }')
      this.dialogVisible = msg
    },
    getNpassedList() {
      return this.request({
        url: this.serverUrl + '/proposalDraft/getAllByNotSeconded',
        method: 'post',
        data: {
          id: this.user.id,
          已提交: '已提交'
        }
      })
    },
    getSupportList() {
      return this.request({
        url: this.serverUrl + '/proposalDraft/getAllByHaveSeconded',
        method: 'post',
        data: {
          id: this.user.id
        }
      })
    },
    supportProposal(proposalid, proposernumber, tableIndex) {
      console.log('id:' + proposalid + 'name:${' + proposernumber + '},tableindex:${' + tableIndex + '}')

      this.$http
        .post(this.serverUrl + '/seconded/createSeconded',
          {
            id: get_uuid(),
            firstBatch: 'true',
            proposerNumber: proposernumber,
            seconderName: this.user.userName,
            seconderNumber: this.user.id,
            seconderTime: new Date(),
            proposalDraftId: proposalid,
            proposalFormalId: '0'
          }
          , { headers: {
            'Content-Type': 'application/json'
            // {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
          }})

      this.notPassedList[tableIndex].checked = true
      this.confirmDialog = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style>
  .support-footer{
    height:50px;
    background-color: white;
  }

  .butt-group{
    margin-left:20%;
  }
  .mypro{
    width:90%;
    margin-left:5%;
  }

  .supportBox{
    width: 100%;
  }

  .grid-content{
    margin-top:4%;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
