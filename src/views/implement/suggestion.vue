<template>
  <div class="app-container">
    <el-row>
      <h3 class="inlineh">提案编号:{{ proposal.propoId }}</h3>   <el-tag type="success">已完成</el-tag>
      <h2>提案{{ proposal.propoName }}</h2>
    </el-row>
    <el-row>
      <div class="propobox">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-tickets" /> &nbsp;提案内容
            </template>
            <div>
              <p>
                {{ proposal.propoContent }}
              </p>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-service" /> &nbsp;提案人及附议人
            </template>
            <div>
              <el-tag type="warning">提案人</el-tag>
              &nbsp;<h3>风味恒</h3>
            </div>
            <div>
              <el-tag type="success">附议人</el-tag>
              <div v-for="person in proposal.supportPeople" :key="person">{{ person }}</div>
            </div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-sort" /> &nbsp;办理人意见
            </template>
            <div>{{ proposal.suggestion }}</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              <i class="el-icon-circle-check-outline" /> &nbsp;校领导意见
            </template>
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Suggestion',
  data() {
    return {
      proposal: [{
        propoId: '',
        propoName: '关于校园建设管理里的问题',
        propoContent: '由于学生存在对于课程项目的偏向性兴趣,以及选课考试能够通过的难易程度,导致了现阶段学生们疯狂抢课的现象,目前学校选课都是先到先得,每到选课时段,同学们便提早出发,全涌向理科楼,导致理科楼产生大面积拥挤现象,楼梯上也站满了人,为踩踏事件的发生创造了可能性;同时也导致选课时间一到就会有大量的信息冲击学校教务处系统,系统运行缓慢,网页无法打开,使许多同学选不到自己喜欢的课程,而勉强学习其他课程,而勉强学习其他课程,致使学生们的学习性不高。',
        supportPeople: ['林宇翩', '分为恒', '王琴'],
        suggestion: '增加热门课程人数和班次,满足同学们兴趣'
      }],
      form: {
        name1: '',
        name2: '',
        name3: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      dialogVisible: false,
      confirmDialog: false,
      detail_con: '',
      tableIndex: ''
    }
  },
  methods: {
    created: function() {
      this.proposal.propoId = this.$route.params.id
    },
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
    clearall() {
      this.form.name1 = ''
      this.form.name2 = ''
      this.form.name3 = ''
    },
    jumpToDetail(i) {
      const p = '/proposal/propodetail/' + i
      this.$router.push({ path: p })
    }
  }
}

</script>
<style scoped>
  .app-container {
    margin-top: '10px';
    margin-left: '10px';
  }
</style>
