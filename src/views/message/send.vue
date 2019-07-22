<template>
  <div class="app-container">
    <sending />
    <sendMessage />
  </div>
</template>

<script>
import sending from './components/sending'
import sendMessage from './components/sendMessage'
export default {
  name: 'Send',
  components: {
    sending,
    sendMessage
  }
}
</script>
