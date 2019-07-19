<template>
  <div class="app-container">
    <aside>
      supportProposal 附议提案---------
      左侧显示自己已提交的提案列表和每个提案对应的附议人数，提供按钮“邀请”---------
      右侧显示他人已提交的提案列表和每个提案对应的附议人数，提供按钮“附议”---------
      发送方选择接收方并点击发送邀请之后，接收方会在Message中收到一条新消息，消息内容包含附议的链接
    </aside>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css

export default {
  name: 'Supportroposal',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
  }
}
</script>
