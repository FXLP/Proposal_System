<template>
  <div class="app-container">
    <div class="user-images">
      <el-carousel :interval="6000" type="card" height="220px">
        <el-carousel-item v-for="item in carouselImages" :key="item">
          <img :src="item+carouselPrefix" class="image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      Show Guide
    </el-button>

    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <h3>已通过提案类型分布</h3>
        <el-row>
          <el-col>
            <div class="chart-wrapper">
              <pie-chart />
            </div>
          </el-col>
        </el-row>
        <h3>每周办理情况</h3>
        <el-row>
          <el-col>
            <div class="chart-wrapper">
              <bar-chart />
            </div>
          </el-col>
        </el-row>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-row :gutter="20">
          <h3>已通过的提案</h3>
          <div class="filterbox">
            <!--            <el-select v-model="dateop" placeholder="日期">-->
            <!--              <el-option-->
            <!--                v-for="item in dateOptions"-->
            <!--                :key="item.value"-->
            <!--                :label="item.label"-->
            <!--                :value="item.value"-->
            <!--              />-->
            <!--            </el-select>-->
            <!--            <el-select v-model="classop" placeholder="类型">-->
            <!--              <el-option-->
            <!--                v-for="item in classOptions"-->
            <!--                :key="item.value"-->
            <!--                :label="item.label"-->
            <!--                :value="item.value"-->
            <!--              />-->
            <!--            </el-select>-->
            <el-date-picker
              v-model="datevalue1"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
            <el-date-picker
              v-model="datevalue2"
              type="date"
              placeholder="选择日期"
            />
            <el-button type="primary" round @click="searchByDate()">搜索</el-button>
          </div>
        </el-row>

        <div class="msgbox">
          <el-row :gutter="20">
            <el-col v-for="item in passedList.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="item.propoid" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="grid-content">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>标题:{{ item.proposalTitle }}</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="jumpToDetail(item.id)">提案详情</el-button>
                  </div>
                  <div class="text item">
                    <span>所属代表团:{{ item.proposalDelegation }}</span>
                    <br>
                    <br>
                    <span>提出日期:{{ item.proposalTime }}</span>
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
          <el-row>
            <div class="pagination-box">
              <el-pagination layout="prev, pager, next" :total="total" :page-size="pagesize" :current-page.sync="currentPage" @current-change="handleCurrentChange" />
            </div>
          </el-row>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import { formartDate } from '@/utils/parseTime'
import steps from './steps'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'
export default {
  name: 'Home',
  components: {
    PieChart,
    BarChart
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      datevalue1: '',
      datevalue2: '',
      total: 10, // 默认数据总数
      pagesize: 8, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      pageNo: 1, // 当前页面
      tableData: [],
      driver: null,
      carouselImages: [
        'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
        'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
        'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
        'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
      ],
      avatarPrefix,
      carouselPrefix,
      dialogVisible: false,
      passedList: [],
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
      detail_con: '',
      dateop: '',
      classop: '',
      input: ''
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  created() {
    return this.request({
      url: this.serverUrl + '/proposalFormal/findAllByProposalReviewTime',
      methods: 'get',
      params: {}
    }).then(res => {
      console.log(res)
      if (res.code !== 0) {
        this.$message({
          type: 'warning',
          message: '更新列表失败'
        })
      } else {
        this.passedList = res.data
        this.total = res.data.length
        this.$message({
          type: 'success',
          message: '更新列表成功'
        })
      }
    })
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    },
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
    },
    jumpToDetail(id) {
      const p = '/proposal/propodetail/' + id
      this.$router.push({ path: p, query: { 'isFormal': true }})
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
    },
    searchByDate() {
      if (this.datevalue === null || this.datevalue2 === null) {
        this.$message({
          message: '日期选项不能为空',
          type: 'warning'
        })
      } else {
        return this.request({
          url: this.serverUrl + '/proposalFormal/getProposalFormalListByTime',
          methods: 'get',
          params: {
            fromTime: formartDate(this.datevalue1).substr(0, 10),
            toTime: formartDate(this.datevalue2).substr(0, 10)
          }
        }).then((response) => {
          if (response.code !== 0) {
            this.$message({
              message: '网络繁忙',
              type: 'warning'
            })
          } else {
            this.passedList = response.data
            this.total = response.data.length
            this.message({
              message: '更新列表成功',
              type: 'success'
            })
          }
        })
      }
    }
  }
}
</script>

<style>
  .grid-content{
    margin-top:4%;
  }

  .filterbox{
    margin-left:2%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .user-images {
    padding-top: 20px;
  }
  .image {
    width: 100%;
    height: 100%;
  }
  .pagination-box{
    float:right;
    margin-top:5%;
  }
</style>
