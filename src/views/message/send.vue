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
  },
  data() {
    return {
      user: {}
    }
  },
  create() {
    // this.user = JSON.parse(localStorage.getItem('user'))
    // console.log(this.user)
  }
}
</script>
