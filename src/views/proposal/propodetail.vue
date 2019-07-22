<template>
  <div class="app-container">
    <aside>
      supportDetail 提案详情---------
      代表通过Proposal support页面点击详情按钮跳转到该页面显示提案的详情
    </aside>

    <el-row class="support-footer">
      <h3>提案{{ propoid }}</h3>
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
      propoid: ''
    }
  },
  created: function() {
    console.log(this.$route.params)
    this.propoid = this.$route.params.id
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {

  }
}
</script>

<style>

</style>
