<template>
  <div class="app-container documentation-container" />

</template>

<script>

export default {
  name: 'Documentation',
  components: { },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

.documentation-container {
  margin: 50px;
  .document-btn {
    float: left;
    margin-left: 50px;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    width: 200px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
