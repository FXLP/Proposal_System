<template>
  <div class="components-container board">
    <div class="board-column">
      <div class="board-column-header">已完成</div>
      <draggable
        :list="list"
        v-bind="$attrs"
        class="board-column-content"
        :set-data="setData"
      >
        <div v-for="element in list3" :key="element.id" class="board-item">
          {{ element.id }}#{{ element.name }}
          <el-button
            size="mini"
            type="danger"
            @click="deleteIt()"
          >删除</el-button>
        </div>
      </draggable>
    </div>

  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  name: 'Handling',
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
      group: 'handling proposal',
      list3: [
        { name: '关于徐汇校区宿舍安装显示屏的建议', id: 1, checked: false },
        { name: '关于徐汇校区宿舍修建大浴室的建议', id: 2, checked: false },
        { name: '关于奉贤校区宿舍新建三食堂的建议', id: 3, checked: false }
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

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #2ac06d;
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

