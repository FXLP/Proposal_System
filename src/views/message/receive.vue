<template>
  <div class="app-container">
    <aside>
      receive message
    </aside>
    <el-button type="primary" @click="ToSendMessage">发送消息</el-button>
  </div>
</template>

<script>

export default {
  name: 'Receive',
  methods: {
    ToSendMessage() {
      this.$router.push('/message/send')
    }
  }
}
</script>
