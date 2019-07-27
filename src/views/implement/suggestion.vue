<template>
  <div class="app-container">
    <el-row>
      <span class="inlineh">提案编号:{{ proposal.propoId }}</span>
      <el-tag type="success">已完成</el-tag>
      <h2>提案:{{ proposal.propoName }}</h2>
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
              &nbsp;<h3>{{ proposal.propoman }}</h3>
            </div>
            <div>
              <el-tag>所属代表团</el-tag>
              &nbsp;<h3>{{ proposal.delegation }}</h3>
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
    <el-form ref="proposal" :model="proposal" :rules="rules" label-width="80px">
      <el-form-item label="您的意见" prop="departmentSuggestion" style="width: 60%;">
        <el-input v-model="proposal.departmentSuggestion" type="textarea" :rows="12" />
      </el-form-item>
    </el-form>
    <el-row class="btn">
      <el-button type="primary">完成协办</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Suggestion',
  data() {
    return {
      proposal: {
        propoId: '',
        propoman: '分为哼',
        delegation: '审计处',
        propoName: '关于校园建设管理里的问题',
        propoContent: '由于学生存在对于课程项目的偏向性兴趣,以及选课考试能够通过的难易程度,导致了现阶段学生们疯狂抢课的现象,目前学校选课都是先到先得,每到选课时段,同学们便提早出发,全涌向理科楼,导致理科楼产生大面积拥挤现象,楼梯上也站满了人,为踩踏事件的发生创造了可能性;同时也导致选课时间一到就会有大量的信息冲击学校教务处系统,系统运行缓慢,网页无法打开,使许多同学选不到自己喜欢的课程,而勉强学习其他课程,而勉强学习其他课程,致使学生们的学习性不高。',
        supportPeople: ['林宇翩', '分为恒', '王琴'],
        suggestion: '增加热门课程人数和班次,满足同学们兴趣上的需求;丰富课程类型,使同学们拥有更大的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地从兴趣上选课;错开选课时间,严格控制各专业的选课时间,增强管理。',
        departmentSuggestion: ''
      },
      rules: {
        departmentSuggestion: [
          { required: true, message: '请填写您的意见', trigger: 'blur' }
        ]
      }
    }
  },
  created: function() {
    console.log(this.$route.params)
    this.proposal.propoId = this.$route.params.id
  },
  methods: {
  }
}
</script>
<style scoped>
  .btn {
    margin-left: 650px;
  }
</style>
