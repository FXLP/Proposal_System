<template>
  <div class="app-container">
    <aside>
    选定实行部门
    消息(收/发消息)
    </aside>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css

export default {
  name: 'Assign',
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
