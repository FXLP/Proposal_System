<template>
  <div class="app-container">
    <aside>
      supportProposal 附议提案---------
      左侧显示自己已提交的提案列表和每个提案对应的附议人数，提供按钮“邀请”---------
      右侧显示他人已提交的提案列表和每个提案对应的附议人数，提供按钮“附议”---------
      发送方选择接收方并点击发送邀请之后，接收方会在Message中收到一条新消息，消息内容包含附议的链接
    </aside>

    <el-row>
      <el-col :span="12">
        <h3>我提出的提案</h3>
        <div class="mypro">
          <el-row :gutter="20">
            <el-col v-for="(item,i) in list" :key="item" :span="12">
              <div class="grid-content">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标题:{{ item.name }}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="jumpToDetail(i)">详情</el-button>
                  </div>
                  <div class="text item">
                    <span>提案进度:{{ item.progress }}</span>
                    <br>
                    <br>
                    <span>附议人数:{{ item.num }}</span>
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
        </div>
      </el-col>

      <el-col :span="12">
        <h3>已提交的提案</h3>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="90"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="90"
          />
          <el-table-column
            prop="proponame"
            label="提案名"
            width="180"
          />
          <el-table-column
            prop="proponum"
            label="已附议人数"
            width="60"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="goToDetail(scope.$index, scope.row)"
              >详情</el-button>
              <el-button
                v-if="!tableData[scope.$index].checked"
                size="mini"
                type="danger"
                @click="supportProp(scope.$index, scope.row)"
              >附议</el-button>
              <el-button
                v-if="tableData[scope.$index].checked"
                disabled="true"
                size="mini"
                type="info"
              >已附议</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-dialog
        title="确认附议"
        :visible.sync="confirmDialog"
        width="30%"
        :before-close="handleClose"
      >
        <span>您确定要附议该提案吗，提交不可修改！</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confirmDialog = false">取 消</el-button>
          <el-button type="primary" @click="tableData[tableIndex].checked=true;confirmDialog = false">确 定</el-button>
        </span>
      </el-dialog>

    </el-row>
    <el-row class="support-footer" />

  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import InviteComponent from '../../components/InviteToSupport/index.vue'
export default {
  name: 'SupportProposal',
  components: {
    InviteComponent
  },
  data() {
    return {
      driver: null,
      tableData: [{
        propoId: '009',
        date: '2016-05-02',
        name: '冯伟横',
        proponame: '关于奉贤食堂会议',
        proponum: '7',
        checked: false
      }, {
        propoId: '008',
        date: '2016-05-04',
        name: '王小虎',
        proponame: '关于徐汇住宿问题',
        proponum: '6',
        checked: true
      }, {
        propoId: '007',
        date: '2016-05-01',
        name: '冯伟狠',
        proponame: '垃圾分类注意',
        proponum: '4',
        checked: false
      }, {
        propoId: '006',
        date: '2016-05-03',
        name: '王小虎',
        proponame: '教工调整',
        proponum: '2',
        checked: false
      },
      {
        propoId: '005',
        date: '2016-05-01',
        name: '冯伟很',
        proponame: '垃圾分类注意',
        proponum: '4',
        checked: true
      },
      {
        propoId: '004',
        date: '2016-05-02',
        name: '王小虎',
        proponame: '关于奉贤食堂会议',
        proponum: '7',
        checked: false
      }],
      list: [
        { name: '提案1', progress: '审核中', pdate: '2019-06', num: '3' },
        { name: '提案2', progress: '已通过', pdate: '2019-06', num: '5' },
        { name: '提案3', progress: '已提交', pdate: '2019-06', num: '2' },
        { name: '提案4', progress: '已提交', pdate: '2019-06', num: '1' }
      ],
      formLabelWidth: '80px',
      dialogVisible: false,
      confirmDialog: false,
      detail_con: '',
      tableIndex: ''
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
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.tableData[index].propoId
      this.$router.push({ path: p })
    },
    inviteForprop(i) {
      this.dialogVisible = true
      this.detail_con = this.list[i].name
    },
    supportProp(index, row) {
      this.tableIndex = index
      this.confirmDialog = true
    },
    jumpToDetail(i) {
      const p = '/proposal/propodetail/' + i
      this.$router.push({ path: p })
    },
    getState(msg) {
      // console.log('msg: ${ msg }')
      this.dialogVisible = msg
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
