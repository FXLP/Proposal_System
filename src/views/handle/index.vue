<template>
  <div class="app-container">
    <aside>
      查看待办理提案 修改办理的提案的进度  完结提案
    </aside>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css

export default {
  name: 'Handle',
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
