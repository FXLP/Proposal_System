<template>
  <div class="app-container">
    <aside>
      代表团团长审核-------------显示附议人数不小于两人的提案列表，每个提案提供按钮包括“详情”、“通过”、“驳回”；------------
      点击“详情”可以查看该提案具体信息；------------
      点击“通过”则该提案会在提案组审核页面显示,同时更新该提案的状态；------------
      点击“驳回”则该提案的状态更改为“草稿”，仅该提案提出者在自己的草稿箱中可见
    </aside>
    <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 98%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="提案名"
      width="360">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>附议人数: {{ scope.row.proponum }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag type="primary">{{ scope.row.proponame }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        <el-button
          size="mini"
          type="success"
          @click="handlePass(scope.$index, scope.row)">通过</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css


export default {
  name: 'CommanderReview',
  data() {
    return {
      tableData: [{
        propoId: '009',
        date: '2019-07-02',
        name: '陈希豪',
        proponame: '关于奉贤校区新建食堂建议',
        proponum: '7',
        checked: false
      }, {
        propoId: '008',
        date: '2019-07-04',
        name: '盛泽宇',
        proponame: '关于徐汇校区修建宿舍楼问题',
        proponum: '6',
        checked: true
      }, {
        propoId: '007',
        date: '2019-07-01',
        name: '林宇翩',
        proponame: '垃圾分类建议',
        proponum: '4',
        checked: false
      }, {
        propoId: '006',
        date: '2019-06-03',
        name: '王琴',
        proponame: '教工调整',
        proponum: '2',
        checked: false
      },
      {
        propoId: '005',
        date: '2018-05-01',
        name: '卜鑫源',
        proponame: '关于奉贤校区新建游泳馆的建议',
        proponum: '4',
        checked: true
      },
      {
        propoId: '004',
        date: '2019-02-02',
        name: '胡晓龙',
        proponame: '关于奉贤食堂会议',
        proponum: '7',
        checked: false
      },
      {
        propoId: '003',
        date: '2019-04-02',
        name: '冯伟恒',
        proponame: '关于徐汇食堂会议',
        proponum: '7',
        checked: false
      }
      ],
        search: ''
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handlePass(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>
