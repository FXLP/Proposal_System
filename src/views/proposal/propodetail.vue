<template>
  <div class="app-container">
    <el-row>
      <el-col :span="16">
        <el-row>
          <h3 class="inlineh">提案编号:{{ proposal.id }}</h3>   <el-tag type="success">已完成</el-tag>
          <h2>提案名:{{ proposal.proposalTitle }}</h2>
        </el-row>
        <el-row>
          <div class="propobox">
            <el-collapse v-model="activeNames">
              <el-collapse-item name="1">
                <template slot="title">
                  <i class="el-icon-tickets" /> &nbsp;提案内容
                </template>
                <div>
                  <p>
                    {{ proposal.summary }}
                  </p>
                </div>
              </el-collapse-item>
              <el-collapse-item v-if="isFormal" name="2">
                <template slot="title">
                  <i class="el-icon-service" /> &nbsp;提案人及附议人
                </template>
                <div>
                  <el-tag type="warning">提案人</el-tag>
                  &nbsp;<h3>{{ proposal.proposerName }}</h3>
                </div>
                <div>
                  <el-tag>所属代表团</el-tag>
                  &nbsp;<h3>{{ proposal.proposerDelegation }}</h3>
                </div>
                <div>
                  <el-tag type="success">附议人</el-tag>
                  <!--                  <div v-for="person in proposal.supportPeople" :key="person">{{ person }}</div>-->
                  <div>{{ proposal.proposalSeconder }}</div>
                </div>
              </el-collapse-item>
              <el-collapse-item v-if="!isFormal" name="2">
                <template slot="title">
                  <i class="el-icon-service" /> &nbsp;提案理由及提案状态
                </template>
                <div>
                  <el-tag type="warning">提案理由</el-tag>
                  &nbsp;<h3>{{ proposal.proposalReason }}</h3>
                </div>
                <div>
                  <el-tag>所属代表团</el-tag>
                  &nbsp;<h3>{{ proposal.proposalStage }}</h3>
                </div>
                <div>
                  <el-tag type="success">所属代表团</el-tag>
                  <!--                  <div v-for="person in proposal.supportPeople" :key="person">{{ person }}</div>-->
                  <div>{{ proposal.proposerDelegation }}</div>
                </div>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template slot="title">
                  <i class="el-icon-sort" /> &nbsp;办理意见
                </template>
                <div>{{ proposal.proposalHandleOpinions }}</div>
              </el-collapse-item>
              <el-collapse-item name="4">
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
                    <el-button style="float: right; padding: 3px 0" type="text" @click="download(proposal.otherAttachmentsAddress)">下载附件</el-button>
                  </div>
                  <div class="text item">
                    <h3>文件大小：</h3>239.93kb
                    <h3>上传时间：</h3>2019-07-17
                  </div>
                  <div class="image-item">
                    <img src="../../../public/pdf.jpg" width="100%">
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
                  <div class="image-item">
                    <img src="../../../public/pdf.jpg" width="100%">
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

      <el-col :span="8">
        <el-row>

          <div class="block">
            <h3>提案进度</h3>
            <el-timeline>
              <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
            <h3 class="inlineh">已附议人数:</h3><el-tag type="warning">{{ supportNum }}</el-tag>
          </div>

          <div v-if="!isFormal" class="inviteBox">
            <h3>邀请代表为您的提案附议</h3>
            <invite-component />
          </div>

          <div v-if="isFormal" class="detailBox">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="审批人" name="1">
                <div v-for="person in approveList" :key="person">
                  {{ person }}
                </div>
              </el-collapse-item>
              <el-collapse-item title="主办部门 & 协办部门" name="2">
                <h3 class="inlineh">主办部门：</h3><div>教务处</div>
                <h3 class="inlineh">协办部门：</h3><div>审计处</div>
              </el-collapse-item>
              <el-collapse-item title="实施意见" name="3">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
              </el-collapse-item>
            </el-collapse>
          </div>

        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { getProposalFormalById, getProposalDraftById } from '@/api/proposal'
import InviteComponent from '../../components/InviteToSupport/index.vue'
export default {
  name: 'Proposaldetail',
  components: {
    InviteComponent
  },
  data() {
    return {
      activeName: '1',
      isFormal: false,
      proposal: {
        id: ''
      },
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }],
      activeNames: ['1'],
      supportNum: 3,
      approveList: [
        '林宇翩', '王青', '分为恒'
      ]
    }
  },
  created: function() {
    console.log(this.$route.params)
    this.proposal.id = this.$route.params.id
    this.isFormal = this.$route.query.isFormal
    console.log('Formal:' + this.isFormal)
    if (this.isFormal) {
      return getProposalFormalById({ id: this.proposal.id })
        .then(res => {
          console.log(res)
          // request return response.data
          if (res.code !== 0) {
            this.$message({
              type: 'warning',
              message: '获取提案失败'
            })
          // this.$router.push('/')
          } else {
            this.proposal = res.data
            this.$message({
              type: 'success',
              message: '获取提案成功'
            })
          }
        })
    } else {
      return getProposalDraftById({ id: this.proposal.id })
        .then(res => {
          if (res.code !== 0) {
            this.$message({
              type: 'warning',
              message: '获取提案失败'
            })
            // this.$router.push('/')
          } else {
            this.proposal = res.data
            this.$message({
              type: 'success',
              message: '获取提案成功'
            })
          }
        })
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    download(url) {
      const { href } = this.$router.resolve({
        path: 'www.baidu.com'
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style>
  .inlineh{
    display:inline;
  }
  .propobox{
    margin-left:3%;
    width:90%;
  }

  .detailBox{
    margin-top:2%;
  }

  .image-item{
    float:right;
    width:50%;
  }

  .text{
    margin-bottom:4%;
    float:left;
    width:50%;
  }

  .inlineh{
    display: inline;
  }

</style>
