<template>
  <div class="components-container board">
    <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="待办" />
    <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="办理中" />
    <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="完结" />
  </div>
</template>
<script>
import Kanban from '@/components/Kanban'

export default {
  name: 'Handle',
  components: {
    Kanban
  },
  data() {
    return {
      group: 'mission',
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 },
        { name: 'Mission', id: 5 }
      ],
      list2: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 },

      ],
      list3: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
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
.kanban {
  &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

