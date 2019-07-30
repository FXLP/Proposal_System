<template>
  <div>
    <h4>提案号:{{ detail_con1 }}</h4>
    <el-form :model="form">
      <el-form-item label="选项:" :label-width="formLabelWidth" require="true">
        <el-select v-model="form.region" placeholder="请选择领导" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="butt-group">
        <el-button type="success" round style="display:block;margin:0 auto" @click="sure">发送消息</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Invite',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    detailCon1: String

  },
  data() {
    return {
      counter: 0,
      formLabelWidth: '80px',
      form: {
        region: ''
      },
      options: [{
        value: '选项1',
        label: '小名'
      }, {
        value: '选项2',
        label: '小红'
      }, {
        value: '选项3',
        label: '小绿'
      }, {
        value: '选项4',
        label: '小黄'
      }, {
        value: '选项5',
        label: '小紫'
      }],
      value: ''
    }
  },
  methods: {
    sure() {
      this.$emit('statusChanged', '已办') // 子组件注册一个事件
    }
  }
}
</script>
