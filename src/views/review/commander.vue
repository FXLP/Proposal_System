<template>
  <div class="app-container">
    <aside>
      代表团团长审核-------------显示附议人数不小于两人的提案列表，每个提案提供按钮包括“详情”、“通过”、“驳回”；------------
      点击“详情”可以查看该提案具体信息；------------
      点击“通过”则该提案会在提案组审核页面显示,同时更新该提案的状态；------------
      点击“驳回”则该提案的状态更改为“草稿”，仅该提案提出者在自己的草稿箱中可见
    </aside>
    <el-table :data="list" style="width: 98%">
      //:data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      <el-table-column
        label="日期"
        width="180"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="提案名"
        width="360"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>提案发起者: {{ scope.row.name }}</p>
            <p>附议人数: {{ scope.row.proponum }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="primary">{{ scope.row.proponame }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
      >
        <template slot="header">
          <!-- slot-scope="scope1" -->
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="goToDetail(scope.$index, scope.row)"
          >详情</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handlePass(scope.$index, scope.row)"
          >通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
<<<<<<< HEAD
    <pagination 
     v-show="total>0"
     :total="total"
     :page.sync="listQuery.page"
     :limit.sync="listQuery.limit"
     @pagination="getList"/>
=======
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
>>>>>>> cf8909debb4f5330ce28e00a81c2612584fd78bb
  </div>
</template>

<script>
import { fetchProposalList } from '@/api/proposal'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CommanderReview',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      search: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchProposalList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
    },
    goToDetail(index, row) {
      const p = '/proposal/propodetail/' + this.list[index].propoId
      this.$router.push({ path: p })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handlePass(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
