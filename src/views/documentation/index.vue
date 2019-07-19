<template>
  <div class="app-container documentation-container">
    <div>
      <el-row :gutter="20">
        <h3>已通过的提案</h3>
        <div class="filterbox">
          <el-select v-model="dateop" placeholder="日期">
            <el-option
              v-for="item in dateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="classop" placeholder="类型">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button type="primary" round>搜索</el-button>
        </div>
      </el-row>
    </div>

    <div class="msgbox">
      <el-row :gutter="20">
        <el-col v-for="(item,i) in list" :key="item" :span="6">
          <div class="grid-content">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>标题:{{ item.name }}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="showdialog(i)">提案详情</el-button>
              </div>
              <div class="text item">
                <span>审批人:{{ item.person }}</span>
                <br>
                <br>
                <span>通过日期:{{ item.pdate }}</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-dialog
          title="提案详情"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>{{ detail_con }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
    </div>

  </div>

</template>

<script>

export default {
  name: 'Documentation',
  components: { },
  data() {
    return {
      dialogVisible: false,
      articleList: [
        { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
        { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
        { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
        { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
        { title: 'v4.0 篇', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
        { title: '自行封装 component', href: 'https://segmentfault.com/a/1190000009090836' },
        { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（上）', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' },
        { title: 'webpack4（下）', href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc' }
      ],
      list: [
        { name: '提案1', person: 'abc1', pdate: '2019-06', content: '这是提案1，这是提案1这是提案1这是提案1这是提案1这是提案1这是提案1这是提案1这是提案1这是提案1' },
        { name: '提案2', person: 'abc2', pdate: '2019-06', content: '这是提案2，这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2这是提案2' },
        { name: '提案3', person: 'abc3', pdate: '2019-06', content: '这是提案3，这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3这是提案3' },
        { name: '提案4', person: 'abc4', pdate: '2019-06', content: '这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，这是提案4，' },
        { name: '提案5', person: 'abc3', pdate: '2019-06', content: '这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，' },
        { name: '提案6', person: 'abc4', pdate: '2019-06', content: '这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，这是提案5，' }
      ],
      dateOptions: [{
        value: '选项1',
        label: '近一周'
      }, {
        value: '选项2',
        label: '近三周'
      }, {
        value: '选项3',
        label: '近半年'
      }, {
        value: '选项4',
        label: '半年前'
      }],
      classOptions: [{
        value: '选项1',
        label: '教务提案'
      }, {
        value: '选项2',
        label: '团建提案'
      }, {
        value: '选项3',
        label: '学生工作'
      }, {
        value: '选项4',
        label: '其他'
      }],
      dateop: '',
      classop: '',
      input: ''
    }
  },
  methods: {
    showdialog(i) {
      this.dialogVisible = true
      this.detail_con = this.list[i].content
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>

.grid-content{
  margin-top:4%;
}

.filterbox{
  margin-left:1%;
}

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
