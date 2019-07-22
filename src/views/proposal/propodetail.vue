<template>
  <div class="app-container">
    <aside>
      supportDetail 提案详情---------
      代表通过Proposal support页面点击详情按钮跳转到该页面显示提案的详情
    </aside>

    <el-row>
      <el-col :span="18">
        <el-row>
          <h3>提案编号:{{ proposal.propoId }}</h3>
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
        <br>
        <el-row>
          <div class="propobox">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>提案附件</span>
                    <el-button style="float: right; padding: 3px 0" type="text">下载附件</el-button>
                  </div>
                  <div class="text item">
                    <h3>文件大小：</h3>239.93kb
                    <h3>上传时间：</h3>2019-07-17
                  </div>
                </el-card>
              </el-col>

              <el-col :span="8">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>提案附件</span>
                    <el-button style="float: right; padding: 3px 0" type="text">下载附件</el-button>
                  </div>
                  <div class="text item">
                    <h3>文件大小：</h3>59.93kb
                    <h3>上传时间：</h3>2019-07-17
                  </div>
                </el-card>
              </el-col>
            </el-row>

            <br>
            <el-input
              v-model="textarea"
              type="textarea"
              :rows="4"
              placeholder="您的意见将会反馈到有关部门"
            />
            <el-button type="success" round>提交意见</el-button>
            <el-button type="warning" round>清空文本</el-button>
          </div>
        </el-row>
      </el-col>

      <el-col :span="6">
        <h3>右侧的内容</h3>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css

export default {
  name: 'Proposaldetail',
  data() {
    return {
      proposal: {
        propoId: '',
        propoName: '关于校园建设管理里的问题',
        propoContent: '由于学生存在对于课程项目的偏向性兴趣,以及选课考试能够通过的难易程度,导致了现阶段学生们疯狂抢课的现象,目前学校选课都是先到先得,每到选课时段,同学们便提早出发,全涌向理科楼,导致理科楼产生大面积拥挤现象,楼梯上也站满了人,为踩踏事件的发生创造了可能性;同时也导致选课时间一到就会有大量的信息冲击学校教务处系统,系统运行缓慢,网页无法打开,使许多同学选不到自己喜欢的课程,而勉强学习其他课程,而勉强学习其他课程,致使学生们的学习性不高。',
        supportPeople: ['林宇翩', '分为恒', '王琴'],
        suggestion: '增加热门课程人数和班次,满足同学们兴趣上的需求;丰富课程类型,使同学们拥有更大的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地的选择余地;平衡各课程考试通过的难易程度,使学生们适当地放下考试的顾虑,更多地从兴趣上选课;错开选课时间,严格控制各专业的选课时间,增强管理。'
      }

    }
  },
  created: function() {
    console.log(this.$route.params)
    this.proposal.propoId = this.$route.params.id
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {

  }
}
</script>

<style>

  .propobox{
    width:90%;
  }

</style>
