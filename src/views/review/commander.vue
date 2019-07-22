<template>
  <div class="app-container">
    <aside>
      代表团团长审核-------------显示附议人数不小于两人的提案列表，每个提案提供按钮包括“详情”、“通过”、“驳回”；------------
      点击“详情”可以查看该提案具体信息；------------
      点击“通过”则该提案会在提案组审核页面显示,同时更新该提案的状态；------------
      点击“驳回”则该提案的状态更改为“草稿”，仅该提案提出者在自己的草稿箱中可见
    </aside>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      Show Guide
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'

export default {
  name: 'CommanderReview',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
