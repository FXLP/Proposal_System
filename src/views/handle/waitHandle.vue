<template>
  <div class="components-container board">
    <div class="board-column">
      <div class="board-column-header1">待办理</div>
      <draggable
        :list="list"
        v-bind="$attrs"
        class="board-column-content"
        :set-data="setData"
      >
      <div v-for="element in list1" :key="element.id" class="board-item" >
        {{ element.id }}#{{ element.name }}
        <el-button
        size="mini"
        type="warning"
        @click="changeToWorking()"
        >办理</el-button>
      </div>
      </draggable>
    </div>

    
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'waitHandle',
  components: {
    draggable
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      group: 'wait handle proposal',
      list1: [
        { name: '关于徐汇校区宿舍安装空调的建议', id: 1, checked: false },
        { name: '关于徐汇校区宿舍修建三食堂的建议', id: 2, checked: false },
        { name: '关于奉贤校区宿舍新建五食堂的建议', id: 3, checked: false },
        { name: '关于奉贤校区宿舍新建实验楼的建议', id: 4, checked: false },
        { name: '关于奉贤校区宿舍新建教学楼的建议', id: 5, checked: false },
        { name: '关于奉贤校区宿舍新建电影院的建议', id: 6, checked: false }
      ]
    }
  }
}
</script>
<style lang="scss">
.board {
  width: 1300px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header1 {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #4A9FF9;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      cursor: pointer;
      width: 100%;
      height: 64px;
      margin: 5px 0;
      background-color: #fff;
      text-align: center;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

