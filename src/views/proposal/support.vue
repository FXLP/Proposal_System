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
        <h3>我的提案</h3>
        <div class="mypro">
          <el-row :gutter="20">
            <el-col v-for="(item,i) in list" :key="item" :span="12">
              <div class="grid-content">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标题:{{ item.name }}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="showdialog(i)">详情/邀請</el-button>
                  </div>
                  <div class="text item">
                    <span>审批人:{{ item.person }}</span>
                    <br>
                    <br>
                    <span>通过日期:{{ item.pdate }}</span>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-dialog
              title="提案详情"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose"
            >
              <span>{{ detail_con }}</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-row>
        </div>
      </el-col>

      <el-col :span="12">
        <h3>待附依的提案</h3>
        <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="180"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
          />
          <el-table-column
            prop="proponame"
            label="提案名"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
              <el-button type="text" size="small">附議</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css

export default {
  name: 'Supportroposal',
  data() {
    return {
      driver: null,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        proponame: '上海市普陀区'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        proponame: '阿薩颯颯'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        proponame: '東方閃電髮貨'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        proponame: '阿爾哈爾恨不得'
      }],
      list: [
        { name: '提案1', person: 'abc1', pdate: '2019-06', content: '这是提案1，这是提案1这是提案1这是提案1这是提案1这是提案1这是提案1这是提案1这是提案1这是提案1' },
        { name: '提案2', person: 'abc2', pdate: '2019-06', content: '这是提案2，这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2' },
        { name: '提案3', person: 'abc3', pdate: '2019-06', content: '这是提案3，这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3' },
        { name: '提案4', person: 'abc4', pdate: '2019-06', content: '这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，' }
      ]
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
  }
}
</script>

<style>
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
