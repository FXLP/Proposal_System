<template>
  <div class="app-container">
    <aside>
    查看本部门需要实行的提案
    选择办理人
    收/发消息
    会签意见
    </aside>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css

export default {
  name: 'Implement',
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
